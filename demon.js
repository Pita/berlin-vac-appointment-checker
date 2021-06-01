const open = require("open");
const axios = require("axios");
const { format, add } = require("date-fns");
const notifier = require("node-notifier");
const player = require("play-sound")((opts = {}));

const lookupTable = new Map([
  [
    "arena",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431",
  ],
  [
    "tempelhof",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158433",
  ],
  [
    "messe",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434",
  ],
  [
    "velodrom",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435",
  ],
  [
    "tegel",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436",
  ],
  [
    "erika",
    "https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158437",
  ],
]);
const rateLimit = 1000 * 2;

/**
 * fires an log message with the current time
 *
 * @param  {...any} msg
 */
function log(...msg) {
  console.log(new Date().toISOString(), ...msg);
}

/**
 * fires an error message with the current time
 * @param {*} msg
 */
function error(msg) {
  console.error(new Date().toISOString(), msg.errno, msg.code, msg?.config?.url);
}

/**
 * changed the date to a more readable format
 * @param {*} link
 * @returns string
 */
function updateLinkDate(link) {
  return link.replace(/\d{4}-\d{2}-\d{2}/, format(new Date(), "yyyy-MM-dd"));
}

/**
 * changed the date to a more readable format
 * @param {*} link
 * @returns string
 */
function updateLinkDatePfizer(link) {
  return link.replace(
    /\d{4}-\d{2}-\d{2}/,
    format(add(new Date(), { days: 42 }), "yyyy-MM-dd")
  );
}

/**
 * checks to see if there are dates, or if there is a second date when required
 * @param {*} data
 * @param {*} xhrLink
 * @param {*} secondShotXhrLink
 * @returns
 */
async function hasSuitableDate(data, xhrLink, secondShotXhrLink) {
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

      for (availability of newData.availabilities) {
        if (availability.slots.length > 0) {
          log("More than one slot when requesting for new Date");
          return true;
        }
      }
    }

    if (data?.availabilities?.length) {
      for (availability of data.availabilities) {
        if (availability.slots.length > 0) {
          log("More than one slot");
          return true;
        }
      }
    }
  } catch (e) {
    throw e;
  }
  return false;
}

/**
 * on finding an appointment, this plays a sound
 */
function notify() {
  console.log("\u0007");

  notifier.notify({
    title: "Vacination",
    message: "Appointment!",
  });

  player.play("./bell-ring-01.wav", function (err) {
    if (err) {
      error(err);
    }
  });
}

/**
 * checks each passed api link on the given offset. on finding one,
 * it notifies, opens a browser window, then waits 2 minutes
 * before checking again
 *
 * @param {*} xhrLink
 * @param {*} bookingLink
 * @param {*} secondShotXhrLink
 * @param {*} offset
 */
function observe(xhrLink, bookingLink, secondShotXhrLink, offset = 0) {
  function reschedule(time) {
    setTimeout(function () {
        observe(xhrLink, bookingLink);
      },Math.ceil(time || Math.random() * 1000 * 10) + offset
    );
  };

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
          reschedule(1000 * 60 * 2);

          return;
        }
      } catch (e) {
        error(e);
      }
      reschedule(rateLimit);
    })
    .catch(function (e) {
      error(e);
      reschedule(rateLimit);
    });
}

/**
 * checks the vaccination centers for open appointments. if it finds
 * one it will wait 1 minute before checking again
 */
let recentlyOpened = false;
function observeImpfstoff() {
  if (!recentlyOpened) {
    log("checking impfstoff.link");

    axios
      .get("https://api.impfstoff.link/?robot=1")
      .then(function (response) {

        response?.data?.stats.forEach(function (stat) {
          if (stat.open === false) {
            return;
          }

          if (lookupTable.has(stat?.id)) {
            open(lookupTable.get(stat.id));
          } else {
            return;
          }

          log("impfstuff success", stat.id);

          recentlyOpened = true;
          setTimeout(function () {
            recentlyOpened = false;
          }, 60000);

          notify();
        });
      })
      .catch(error);
  }

  setTimeout(observeImpfstoff, rateLimit);
}

let availabilities = false
function observePunctumMedico() {
  if (!availabilities) {
    log('checking Punctum Medico')

    FormData = require('form-data')
    const formData = new FormData();
    formData.append('uniqueident', '5a72efb4d3aec');

    axios.post(
      'https://onlinetermine.zollsoft.de/includes/searchTermine_app_feature.php',
      formData,
      {
        headers: formData.getHeaders()
      }
    ).then(function (response) {
      response?.data?.termine.forEach(function (appt) {
        if (!appt.length) {
          return;
        }

        const matchingAppt = appt.some((detail) => {
          if (!detail) {
            return
          }

          const lowercase = detail.toLowerCase()
          return lowercase.includes('erstimpfung')
        })

        if (!matchingAppt) {
          return;
        }

        log("Punctum Medico success", appt);

        availabilities = true;
        setTimeout(function () {
          availabilities = false;
        }, 60000);

        notify();
      });
    })
    .catch(error);
  }

  setTimeout(observePunctumMedico, rateLimit);
}

const data = [
  /*
    Comment out places you do not want to be checked

    bookingLink: the doctolib link where a human can book an appointment
    xhrLink: the link to doctolib's api where booking availabilty gets checked.
             You can find this link in the debugger console of your browser. The date will get automatically corrected to the current date

    secondShotXhrLink: Some places want you to book a second shoot immediatly, if they don't have a slot for a second appointment, you can't book at all.
                       So in this cases it makes sense to check this second appointment as well

    some second shots are listed separately as they are listed seperately on the doctor's page. in order to not confuse an initial user, these are commented out by default
  */

  { // AZ first
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2764198&agenda_ids=190434&insurance_sector=public&practice_ids=114976&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg"
  },
  // { // AZ second
  //   xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2764199&agenda_ids=190434&insurance_sector=public&practice_ids=114976&limit=4",
  //   bookingLink: "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg"
  // },
  { // J&J
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2886231&agenda_ids=190434&insurance_sector=public&practice_ids=114976&limit=4",
    bookingLink: "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg"
  },
  { // AZ first
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2862419&agenda_ids=305777&insurance_sector=public&practice_ids=120549&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh"
  },
  // { // AZ second
  //   xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2862420&agenda_ids=305777&insurance_sector=public&practice_ids=120549&limit=4",
  //   bookingLink: "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh"
  // },
  { // J&J
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2879179&agenda_ids=305777&insurance_sector=public&practice_ids=120549&limit=4",
    bookingLink: "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh"
  },
  { // BioNTech
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-05-30&visit_motive_ids=2733996&agenda_ids=56915&insurance_sector=public&practice_ids=22563&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/facharzt-fur-hno/berlin/rafael-hardy"
  },
  { // AZ
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2784656&agenda_ids=268801&insurance_sector=public&practice_ids=178663&limit=4",
    bookingLink: "https://www.doctolib.de/innere-und-allgemeinmediziner/berlin/oliver-staeck",
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
  },
  { // J&J
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885945&agenda_ids=268801&insurance_sector=public&practice_ids=178663&limit=4",
    bookingLink: "https://www.doctolib.de/innere-und-allgemeinmediziner/berlin/oliver-staeck"
  },
  { // AZ first
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811460&agenda_ids=464751&insurance_sector=public&practice_ids=28436&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln"
  },
  // { // AZ second
  //   xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811461&agenda_ids=464751&insurance_sector=public&practice_ids=28436&limit=4",
  //   bookingLink: "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln"
  // },
  { // J&J
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811530&agenda_ids=464773&insurance_sector=public&practice_ids=28436&limit=4",
    bookingLink: "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln"
  },
  { // BioNTech first
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2757216&agenda_ids=439400&insurance_sector=public&practice_ids=107774&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum"
  },
  // { // BioNTech second
  //   xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2757217&agenda_ids=439400&insurance_sector=public&practice_ids=107774&limit=4",
  //   bookingLink: "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum"
  // },
  { // AZ first
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885841&agenda_ids=480139&insurance_sector=public&practice_ids=107774&destroy_temporary=true&limit=4",
    bookingLink: "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum"
  },
  // { // AZ second
  //   xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885842&agenda_ids=480139&insurance_sector=public&practice_ids=107774&limit=4",
  //   bookingLink: "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum"
  // },
  { // J&J
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2880391&agenda_ids=480095&insurance_sector=public&practice_ids=107774&limit=4",
    bookingLink: "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum"
  },
  { // BioNTech
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457591-457443-457477-457487-457405-457414-457511-457594-457432-397846-457408-457421-457435-457489-457563-457567-457569-457439-457493-457453-457406-457416-457418-457426-457400-457404-457409-457419-457420-457427-457448-457483-457425-457428-457415-457504-457597-457566-457412-457457-457436-457463-397845-397844-457411-457497-457424-457429-457430-457442-457470-404659-457596-457407-457410-457593&insurance_sector=public&practice_ids=158434&destroy_temporary=true&limit=4`,
    secondShotXhrLink: `https://www.doctolib.de/second_shot_availabilities.json?start_date=2021-06-28&visit_motive_ids=2495719&agenda_ids=457591-457443-457477-457487-457405-457414-457511-457594-457432-397846-457408-457421-457435-457489-457563-457567-457569-457439-457493-457453-457406-457416-457418-457426-457400-457404-457409-457419-457420-457427-457448-457483-457425-457428-457415-457504-457597-457566-457412-457457-457436-457463-397845-397844-457411-457497-457424-457429-457430-457442-457470-404659-457596-457407-457410-457593&first_slot=2021-05-19T13%3A30%3A00.000%2B02%3A00&insurance_sector=public&practice_ids=158434&limit=4`,
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434`,
  },
  { // BioNTech
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=397800-397776-402408-397766&insurance_sector=public&practice_ids=158431&destroy_temporary=true&limit=4`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
  },
  { // BioNTech
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=404654-457215-457244-397972-457210-457239-457213-457278-457283-457304-457306-457229-457234-457299-457212-457216-457288-457291-457315-457227-457204-457237-457296-397974-457312-457280-457206-457310-457319-397973-457243-457208-457218-457245-457274-457321&insurance_sector=public&practice_ids=158435&destroy_temporary=true&limit=4`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
  },
  { // BioNTech
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457379-457323-457329-457334-457346-457253-457255-457256-457294-457317-457335-457399-457514-457350-457326-457330-457254-457267-457303-457275-457276-457281-457289-457300-457301-457302-457307-457309-457314-457331-457388-457515-457338-457263-457266-457277-457286-457287-457308-457320-457343-457268-457500-397841-457512-457382-457385-457324-457460-457513-457285-457392-457395-457251-397843-457252-457264-457271-457279-457290-457292-457318-457358-457327-457341-457293-457250-457305-457377-457396-457333-457349-457265-457313-457316-457295-457390-457363-457282-457297-397842-457336-457337-457413-404656-457510&insurance_sector=public&practice_ids=158436&destroy_temporary=true&limit=4`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
  },
  { // AZ first
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2836657&agenda_ids=469719&insurance_sector=public&practice_ids=162056&destroy_temporary=true&limit=4`,
    bookingLink: `https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum`,
  },
  // { // AZ second
  //   xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2836662&agenda_ids=469719&insurance_sector=public&practice_ids=162056&limit=4`,
  //   bookingLink: `https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum`,
  // },
  { // J&J
    bookingLink: "https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum",
    xhrLink: "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2898162&agenda_ids=469719&insurance_sector=public&practice_ids=162056&limit=4"
  }
];

// Comment out to disable checking individual links
let offset = 0;
data.forEach((links) => {
  offset = offset + 100;
  observe(links.xhrLink, links.bookingLink, links.secondShotXhrLink, offset);
});

// Comment out to disable checking impfstoff.link for availabilities.
observeImpfstoff();

// Comment back in order to observe Punctum Medico
// observePunctumMedico();

log("Started checking periodically...");
log(
  "Just keep it running, it will play a sound and open a browser when an appointment opens up"
);
