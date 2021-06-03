import axios, { AxiosResponse } from "axios";
import { impfstoffEntries } from "../data";

import {
  error,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT,
} from "../demon.helpers";

import config from "../config";

import type { ImpfstoffResponse } from "../demon.types";

/**
 * checks the vaccination centers for open appointments. if it finds
 * one it will wait 1 minute before checking again
 */
let recentlyOpened = false;
function observeImpfstoff(): void {
  const {
    shot,
    vaccines
  } = config;

  /**
   * we check for second shot since all vaccination centers only do both shots
   */
  if (!recentlyOpened && !shot.second) {
    log("checking impfstoff.link");

    axios
      .get("https://api.impfstoff.link/?robot=1")
      .then(function (response: AxiosResponse<ImpfstoffResponse>) {
        response?.data?.stats.forEach(function (stat) {
          if (stat.open === false) {
            return;
          }

          const entry = impfstoffEntries[stat.id];
          if (entry) {
            const {
              bookingLink,
              vaccine,
              vaccine2
            } = entry;

            /**
            * check if the link has an enabled vaccine, and it fits against the shot filter
             */
            if (vaccines[vaccine] || vaccine2 && vaccines[vaccine2]) {
              open(bookingLink);

              notify();

              log("impfstuff success", stat.id);
            }
          } else {
            return;
          }

          recentlyOpened = true;
          setTimeout(function () {
            recentlyOpened = false;
          }, ONE_MINUTE);
        });
      })
      .catch(error);
  }

  setTimeout(observeImpfstoff, RATE_LIMIT);
}

export default observeImpfstoff;
