import axios from "axios";
import chalk from "chalk";

import {
  error,
  filterResponse,
  hasSuitableDate,
  log,
  notify,
  ONE_MINUTE,
  open,
  RATE_LIMIT,
  success,
  updateLinkDate,
} from "../demon.helpers";

import { IndividualLink } from "../demon.types";
import config from "../config";

/**
 * checks each passed api link on the given offset. on finding one,
 * it notifies, opens a browser window, then waits 2 minutes
 * before checking again
 *
 */
function observeIndividualLink(link: IndividualLink, offset = 0): void {
  const { bookingLink, secondShotXhrLink, shot, vaccine, xhrLink } = link;

  /**
   * after running, we need to set it to run again
   * @param time
   */
  function reschedule(time: number) {
    setTimeout(function () {
      observeIndividualLink(link, offset);
    }, Math.ceil(time || Math.random() * 1000 * 10) + offset);
  }

  /**
   * check if the link has an enabled vaccine, and it fits against the shot filter
   */
  const shouldCheck = config.vaccines[vaccine] && config.shot[shot];

  if (shouldCheck) {
    const info = `- ${shot} shot ${chalk.magenta(vaccine)} ${bookingLink.replace("https://www.doctolib.de/", "")}`;
    log(chalk.cyan("checking"), info);

    axios
      .get(updateLinkDate(xhrLink))
      .then(async function (response) {
        try {
          const [ isSuitable, data, secondShotData ] = await hasSuitableDate(
            response?.data,
            xhrLink,
            secondShotXhrLink
          );

          const filteredResponse = filterResponse(data);
          let filteredSecondResponse;

          if (secondShotData) {
            filteredSecondResponse = filterResponse(data);
          }

          if (isSuitable && filteredResponse) {
            open(bookingLink);

            const firstSuccessInfo = `success! ${vaccine} on ${filteredResponse.availabilities[0].date}`;
            const secondSuccessInfo = ` - with a second shot on ${filteredSecondResponse?.availabilities[0].date}`;

            if (config.debug) {
              success(`[DEBUG] ${firstSuccessInfo}`, info);
              log(filteredResponse);
              if (filteredSecondResponse) {
                success(`[DEBUG]`, secondSuccessInfo);
                log(filteredSecondResponse);
              }
            } else {
              success(firstSuccessInfo, info);
              if (filteredSecondResponse) {
                success(secondSuccessInfo);
              }
            }

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
}

export default observeIndividualLink;
