import FormData from "form-data";
import axios, { AxiosResponse } from "axios";
import chalk from "chalk";

import { punctumMedicoApiLink, punctumMedicoBookingLink } from "../data";

import {
  error,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT,
  success,
} from "../demon.helpers";

import config from "../config";

import type { ZollSoftResponse } from "../demon.types";

let availabilities = false;
function observePunctumMedico(): void {
  setTimeout(observePunctumMedico, RATE_LIMIT);
  const { shot, vaccines } = config;
  const {
    astrazeneca,
    biontech,
    johnsonAndJohnson
  } = vaccines;

  const shouldCheck =
    !shot.second &&
    (astrazeneca || biontech || johnsonAndJohnson);

  if (!availabilities && shouldCheck) {
    log(chalk.cyan("checking"), "- Punctum Medico");

    const formData = new FormData();
    formData.append("uniqueident", "5a72efb4d3aec"); // this ID may need to be updated eventually

    axios
      .post(
        punctumMedicoApiLink,
        formData,
        {
          headers: formData.getHeaders(),
        }
      )
      .then(function (response: AxiosResponse<ZollSoftResponse>) {
        response?.data?.termine.forEach(function (appt) {
          // if they change their api this will stop working
          const apptObj = {
            date: appt[0],
            time: appt[1],
            doctor: appt[3],
            detail: appt[4],
          };

          if (!appt.length) {
            return;
          }

          const matchingAppt = (detail: string) => {
            if (!detail) {
              return;
            }

            const lowercase = detail.toLowerCase();

            const correctVaccine =
              astrazeneca && lowercase.includes("astrazeneca") ||
              biontech && lowercase.includes("biontech") ||
              johnsonAndJohnson && lowercase.includes("johnson & johnson");

            return lowercase.includes("erstimpfung") && correctVaccine;
          };

          if (!matchingAppt(apptObj.detail)) {
            return;
          }

          open(punctumMedicoBookingLink);

          if (config.debug) {
            success(`[DEBUG] Punctum Medico success on ${appt[0]} with ${appt[3]}`);
            log(apptObj);
          } else {
            success(`Punctum Medico success on ${appt[0]} with ${appt[3]}`);
          }

          availabilities = true;
          setTimeout(function () {
            availabilities = false;
          }, ONE_MINUTE);

          notify();
        });
      })
      .catch(error);
  }
}

export default observePunctumMedico;
