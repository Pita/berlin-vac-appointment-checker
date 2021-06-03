import FormData from "form-data";
import axios, { AxiosResponse } from "axios";

import {
  error,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT,
} from "../demon.helpers";

import config from "../config";

import type { ZollSoftResponse } from "../demon.types";

let availabilities = false;
function observePunctumMedico(): void {
  setTimeout(observePunctumMedico, RATE_LIMIT);
  const {shot, vaccines } = config;

  const shouldCheck = !shot.second && (vaccines.astrazeneca || vaccines.biontech || vaccines.johnsonAndJohnson);

  if (!availabilities && shouldCheck) {
    log("checking Punctum Medico");

    const formData = new FormData();
    formData.append("uniqueident", "5a72efb4d3aec"); // this ID may need to be updated eventually

    axios
      .post(
        "https://onlinetermine.zollsoft.de/includes/searchTermine_app_feature.php",
        formData,
        {
          headers: formData.getHeaders(),
        }
      )
      .then(function (response: AxiosResponse<ZollSoftResponse>) {
        response?.data?.termine.forEach(function (appt) {
          if (!appt.length) {
            return;
          }

          const matchingAppt = appt.some((detail) => {
            if (!detail) {
              return;
            }

            const lowercase = detail.toLowerCase();
            return lowercase.includes("erstimpfung");
          });

          if (!matchingAppt) {
            return;
          }

          log("Punctum Medico success", appt.join(","));

          availabilities = true;
          setTimeout(function () {
            availabilities = false;
          }, ONE_MINUTE);

          open("https://punctum-medico.de/onlinetermine/");

          notify();
        });
      })
      .catch(error);
  }
}

export default observePunctumMedico;
