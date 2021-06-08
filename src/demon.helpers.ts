import axios, { AxiosError } from "axios";
import { format, add } from "date-fns";
import notifier from "node-notifier";
import playerModule from "play-sound";
import * as path from "path";
import chalk from "chalk";

import type {
  DoctoLibAvailability,
  DoctoLibResponse,
  FilteredDoctoLibResponse,
} from "./demon.types";

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
export function log(...msg: (string | Record<string, any>)[]): void {
  console.log(chalk.yellow(new Date().toISOString()), ...msg);
}

/**
 * fires an error message with the current time
 */
export function error(msg: AxiosError): void {
  console.error(
    chalk.yellow(new Date().toISOString()),
    chalk.red(msg.code, msg?.config?.url)
  );
}

/**
 * fires an error message with the current time
 */
export function success(...msg: string[]): void {
  console.error(chalk.yellow(new Date().toISOString()), chalk.green(...msg));
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
 * takes the response from doctolib and cleans it up for display
 * @param data
 * @returns Partial<DoctoLibResponse>
 */
export function filterResponse(
  data: DoctoLibResponse
): FilteredDoctoLibResponse {
  const availabilities = (data.availabilities || []).filter(
    (a: DoctoLibAvailability) => a.slots.length !== 0
  );
  const response = {
    availabilities: availabilities,
    total: data.total,
  };

  return response;
}

/**
 * checks to see if there are dates, or if there is a second date when required
 */
export async function hasSuitableDate(
  data: DoctoLibResponse,
  xhrLink: string,
  secondShotXhrLink: string | undefined
): Promise<[boolean, DoctoLibResponse, DoctoLibResponse?]> {
  try {
    if (data?.total) {
      if (secondShotXhrLink) {
        const secondShotData = (
          await axios.get(updateLinkDatePfizer(secondShotXhrLink))
        ).data;

        return [secondShotData.total !== 0, data, secondShotData];
      }
    }

    if (data?.next_slot) {
      const newData = (
        await axios.get(xhrLink.replace(/\d{4}-\d{2}-\d{2}/, data.next_slot))
      ).data;

      for (const availability of newData.availabilities) {
        if (availability.slots.length > 0) {
          return [true, newData];
        }
      }
    }

    if (data?.availabilities?.length) {
      for (const availability of data.availabilities) {
        if (availability.slots.length > 0) {
          return [true, data];
        }
      }
    }
  } catch (e) {
    error(e);
  }
  return [false, data];
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
