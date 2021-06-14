/**
 * use this to refine your search options.
 *
 * you will have to restart the service to reflect any of these changes
 */
const config = {
  /**
   * allows for finer control depending on which shot you need
   */
  shot: {
    /**
     * setting this to true will only show first shot appointments
     *
     * please note that this will still show places that require
     * both appointments to be made at once
     *
     * please note that this will still ionclude single shot vaccines
     */
    first: true,

    /**
     * setting this to true will only show second shot appointments
     *
     * please note that this will NOT show places that require
     * both appointments to be made at once
     */
    second: false,
  },

  /**
   * set any of these to false to disable checking them
   */
  sources: {
    /**
     * collected links of doctors offering vaccinations
     */
    doctolibLinks: true,

    /**
     * Senftenberger Ring 5a, 13439 Berlin
     */
    punctumMedicum: true,

    /**
     * official vaccination centers
     */
    vaccinationCenters: true,
  },

  /**
   * set any of the below vaccine options to false to exclude them from your serach.
   */
  vaccines: {
    astrazeneca: true,
    biontech: true,
    johnsonAndJohnson: true,
    moderna: true,
  },

  /**
   * this enables more thorough logging in the console.
   * this should be unnecessary unless you are developing
   */
  debug: false,
};

export default config;
