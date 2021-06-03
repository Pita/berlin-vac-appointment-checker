import axios, { AxiosError } from "axios";
import { format, add } from "date-fns";
import notifier from "node-notifier";
import playerModule from "play-sound";
import * as path from "path";
import chalk from "chalk";

import type { DoctoLibResponse } from "./demon.types";

const player = playerModule({});

/**
 * we re-export this to put it on the same level as log, error, notify, etc
 */
export { default as open } from "open";

export const RATE_LIMIT = 1000 * 3;
export const ONE_MINUTE = 60000;

/**
 * fires an log message with the current time
 */
export function log(...msg: string[]): void {
  console.log(chalk.yellow(new Date().toISOString()), ...msg);
}

/**
 * fires an error message with the current time
 */
export function error(msg: AxiosError): void {
  console.error(
    chalk.yellow(new Date().toISOString()), chalk.red( msg.code, msg?.config?.url)
  );
}

/**
 * changed the date to a more readable format
 */
export function updateLinkDate(link: string): string {
  return link.replace(/\d{4}-\d{2}-\d{2}/, format(new Date(), "yyyy-MM-dd"));
}

/**
 * changed the date to a more readable format
 */
export function updateLinkDatePfizer(link: string): string {
  return link.replace(
    /\d{4}-\d{2}-\d{2}/,
    format(add(new Date(), { days: 42 }), "yyyy-MM-dd")
  );
}

/**
 * checks to see if there are dates, or if there is a second date when required
 */
export async function hasSuitableDate(
  data: DoctoLibResponse,
  xhrLink: string,
  secondShotXhrLink: string | undefined
): Promise<boolean> {
  try {
    if (data?.total) {
      log("More than 0 availabilities");

      if (secondShotXhrLink) {
        const secondShotData = (
          await axios.get(updateLinkDatePfizer(secondShotXhrLink))
        ).data;

        log("second shot data", secondShotData);

        return secondShotData.total !== 0;
      }
    }

    if (data?.next_slot) {
      const newData = (
        await axios.get(xhrLink.replace(/\d{4}-\d{2}-\d{2}/, data.next_slot))
      ).data;

      log("further checking for specific later date", xhrLink);

      for (const availability of newData.availabilities) {
        if (availability.slots.length > 0) {
          log("More than one slot when requesting for new Date");
          return true;
        }
      }
    }

    if (data?.availabilities?.length) {
      for (const availability of data.availabilities) {
        if (availability.slots.length > 0) {
          log("More than one slot");
          return true;
        }
      }
    }
  } catch (e) {
    error(e);
  }
  return false;
}

/**
 * on finding an appointment, this plays a sound
 */
export function notify(): void {
  console.log("\u0007");

  notifier.notify({
    title: "Vacination",
    message: "Appointment!",
  });

  player.play(
    path.join(__dirname, "./bell-ring-01.wav"),
    function (err: Error) {
      if (err) {
        log(chalk.red(err));
      }
    }
  );
}
