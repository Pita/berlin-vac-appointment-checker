import axios from "axios";

import {
  error,
  hasSuitableDate,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT,
  updateLinkDate,
} from "../demon.helpers";

/**
 * checks each passed api link on the given offset. on finding one,
 * it notifies, opens a browser window, then waits 2 minutes
 * before checking again
 *
 */
function observeIndividualLink(
  xhrLink: string,
  bookingLink: string,
  secondShotXhrLink: string | undefined,
  offset = 0
): void {
  /**
   * after running, we need to set it to run again
   * @param time
   */
  function reschedule(time: number) {
    setTimeout(function () {
      observeIndividualLink(xhrLink, bookingLink, secondShotXhrLink);
    }, Math.ceil(time || Math.random() * 1000 * 10) + offset);
  }

  log("checking directly", bookingLink);

  axios
    .get(updateLinkDate(xhrLink))
    .then(async function (response) {
      try {
        const isSuitable = await hasSuitableDate(
          response?.data,
          xhrLink,
          secondShotXhrLink
        );
        if (isSuitable) {
          log("direct success", response.data, bookingLink);

          open(bookingLink);

          notify();

          // 2 Minutes break
          reschedule(ONE_MINUTE * 2);

          return;
        }
      } catch (e) {
        error(e);
      }
      reschedule(RATE_LIMIT);
    })
    .catch(function (e) {
      error(e);
      reschedule(RATE_LIMIT);
    });
}

export default observeIndividualLink;
