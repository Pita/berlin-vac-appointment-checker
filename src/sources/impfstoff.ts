import axios, { AxiosResponse } from "axios";
import { impfstoffLookupTable } from"../data";

import {
  error,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT
} from "../demon.helpers";

import type { ImpfstoffResponse } from "../demon.types";

/**
 * checks the vaccination centers for open appointments. if it finds
 * one it will wait 1 minute before checking again
 */
let recentlyOpened = false;
function observeImpfstoff(): void {
  if (!recentlyOpened) {
    log("checking impfstoff.link");

    axios
      .get("https://api.impfstoff.link/?robot=1")
      .then(function (response: AxiosResponse<ImpfstoffResponse>) {
        response?.data?.stats.forEach(function (stat) {
          if (stat.open === false) {
            return;
          }

          const lookupTableEntry = impfstoffLookupTable.get(stat.id);
          if (lookupTableEntry) {
            open(lookupTableEntry);
          } else {
            return;
          }

          log("impfstuff success", stat.id);

          recentlyOpened = true;
          setTimeout(function () {
            recentlyOpened = false;
          }, ONE_MINUTE);

          notify();
        });
      })
      .catch(error);
  }

  setTimeout(observeImpfstoff, RATE_LIMIT);
}

export default observeImpfstoff;
