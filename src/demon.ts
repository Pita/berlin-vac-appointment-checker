import chalk from "chalk";

import { individualLinks } from "./data";

import {
  observeIndividualLink,
  observeImpfstoff,
  observePunctumMedico,
} from "./sources";

import config from "./config";

import { log } from "./demon.helpers";

const { debug, sources } = config;

if (sources.doctolibLinks) {
  let offset = 0;
  individualLinks.forEach((link) => {
    offset = offset + 100;
    observeIndividualLink(link, offset);
  });
}

if (sources.vaccinationCenters) {
  observeImpfstoff();
}

if (sources.punctumMedicum) {
  observePunctumMedico();
}

log(chalk.cyan("Started checking periodically..."));
log(
  chalk.cyan(
    "Just keep it running, it will play a sound and open a browser when an appointment opens up"
  )
);
if (debug) {
  log(chalk.bgMagenta("DEBUG MODE IS ENABLED"));
}
