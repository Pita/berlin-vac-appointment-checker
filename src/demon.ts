import chalk from "chalk";

import { individualLinks } from"./data";

import {
  observeIndividualLink,
  observeImpfstoff,
  observePunctumMedico
} from"./sources";

import { log } from "./demon.helpers";

// Comment out to disable checking individual links
let offset = 0;
individualLinks.forEach((links) => {
  offset = offset + 100;
  observeIndividualLink(links.xhrLink, links.bookingLink, links.secondShotXhrLink, offset);
});

// Comment out to disable checking impfstoff.link for availabilities.
observeImpfstoff();

// Comment out to disable punctum medico for availabilities.
observePunctumMedico();

log(chalk.green("Started checking periodically..."));
log(
  chalk.green(
    "Just keep it running, it will play a sound and open a browser when an appointment opens up"
  )
);
