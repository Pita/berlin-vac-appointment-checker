/**
 * a single date of apointments and all slots on that day
 */
export type DoctoLibAvailability = {
  /**
   * yyyy-mm-dd string of the date of the availabilitsavailable
   */
  date: string;

  /**
   * an array of time strings
   * i.e 2021-06-04T11:55:00.000+02:00
   */
  slots: string[];
};

/**
 * a response from Doctolib. contains updates appointment data
 */
export type DoctoLibResponse = {
  /**
   * array of available appointments
   */
  availabilities?: DoctoLibAvailability[];

  /**
   * yyyy-mm-dd formatted date of the next open slot
   */
  next_slot?: string;

  /**
   * total number of  availabilities returned
   */
  total: number;
};

/**
 * a response from Doctolib after being cleaned up for display
 */
export type FilteredDoctoLibResponse = {
  /**
   * array of available appointments
   */
  availabilities: DoctoLibAvailability[];

  /**
   * total number of  availabilities returned
   */
  total: number;
};

/**
 * the response from a single vaccination center
 */
export type ImpstoffAvailability = {
  /**
   * id to which vaccination center
   */
  id: string;

  /**
   * human readable name of the vaccination center
   */
  name: string;

  /**
   * whether or not there are open appoinments
   */
  open: boolean;
};

export type ImpstoffEntry = {
  /**
   * the link that will be opened in the browser when an appointment is found
   */
  bookingLink: string;

  /**
   * type of vaccine offered. this is used to allow filtering via the config
   */
  vaccine: "astrazeneca" | "biontech" | "johnsonAndJohnson" | "moderna";

  /**
   * type of vaccine offered. this is used to allow filtering via the config.
   *
   * some places offer morethan one type and due to the api we cannot filter exactly
   */
  vaccine2?: "astrazeneca" | "biontech" | "johnsonAndJohnson" | "moderna";
};

export type ImpfstoffEntries = {
  [key: string]: ImpstoffEntry;
};

/**
 * a response from impfstoff.link. contains updates appointment data
 */
export type ImpfstoffResponse = {
  /**
   * array of possible availabilities
   */
  stats: ImpstoffAvailability[];
};

/**
 * an indiviual doctors office to check for availabilities
 */
export interface IndividualLink {
  /**
   * the link that will be opened in the browser when an appointment is found
   */
  bookingLink: string;

  /**
   * Some places want you to book a second shoot immediatly, if they don't
   * have a slot for a second appointment, you can't book at all. So in
   * this cases it makes sense to check this second appointment as well
   */
  secondShotXhrLink?: string;

  /**
   * filters by first or second shot.  "first" also includes single shot
   * as well as places tat require booking both at once
   */
  shot: "first" | "second";

  /**
   * type of vaccine offered. this is used to allow filtering via the config
   */
  vaccine: "astrazeneca" | "biontech" | "johnsonAndJohnson" | "moderna";

  /**
   * the link to doctolib's api where booking availabilty gets checked.
   * You can find this link in the debugger console of your browser.
   * The date will get automatically corrected to the current date
   */
  xhrLink: string;
}

/**
 * Array of links to be processed
 */
export type IndividualLinks = IndividualLink[];

/**
 * a response from onlinetermine.zollsoft.de. contains updates appointment data
 */
export type ZollSoftResponse = {
  termine: string[][];
};
