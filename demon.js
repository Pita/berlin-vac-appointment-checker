const open = require("open");
const axios = require("axios");
const { format } = require("date-fns");
const notifier = require('node-notifier');
const player = require('play-sound')(opts = {})

function log(...msg) {
  console.log(new Date().toISOString(), ...msg);
}

function error(msg) {
  console.error(new Date().toISOString(), msg);
}

function updateLinkDate(link) {
  return link.replace(/\d{4}-\d{2}-\d{2}/, format(new Date(), "yyyy-MM-dd"));
}

function hasSuitableDate(data) {
  try {
    if (data.total > 0) {
      log("More than 0 availabilities")
      return true;
    }

    if (data.next_slot && data.next_slot.startsWith("2021-05")) {
      log("Availability this month")
      return true;
    }

    if (data.availabilities) {
      for (availability of data.availabilities) {
        if (availability.slots.length > 0) {
          log("More than one slot")
          return true;
        }
      }
    }
  } catch(e) {
    error(e)
    return false;
  }
}

function notify() {
  console.log('\u0007');

  notifier.notify({
    title: 'Vacination',
    message: 'Appointment!'
  });

  player.play('./bell-ring-01.wav', (err) => {if (error) {console.error(err)}})
}

function observe(xhrLink, bookingLink) {
  const reschedule = (time) => {
    setTimeout(
      () => observe(xhrLink, bookingLink),
      Math.ceil(time || Math.random() * 5000)
    );
  };

  axios
    .get(updateLinkDate(xhrLink))
    .then((response) => {
      try {
        log('For: ', bookingLink);
        log(response.data);

        const isSuitable = hasSuitableDate(response.data);
        if (isSuitable) {
          log("success");

          open(bookingLink);

          notify();

          // 2 Minutes break
          reschedule(1000 * 60 * 2);

          return;
        }
      } catch (e) {
        error(e);
      }
      reschedule();
    })
    .catch((e) => {
      error(e);
      reschedule();
    });
}

let recentlyOpened = false;
function observeImpfstoff() {
  if (!recentlyOpened) {
    axios.get('https://api.impfstoff.link/?robot=1').then(response => {
      response.data.stats.forEach(stat => {
        if (stat.open === false) {
          return;
        }

        let isOk = false;
        switch(stat.id) {
          case 'arena':
            isOk = true;
            open('https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431');
            break;
          case 'messe':
            isOk = true;
            open('https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434');
            break;
          case 'velodrom':
            isOk = true;
            open('https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435');
            break;
          // case 'tegel':
          //   open('https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436');
          //   break;
          default:
            return;
        }

        if (!isOk) {
          return;
        }

        log("impfstuff success", stat.id);

        recentlyOpened = true;
        setTimeout(() => {
          recentlyOpened = false;
        }, 60000);

        notify();
      })
    }).catch(error);
  }

  setTimeout(observeImpfstoff, 1500);
}

const data = [
  {
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457591-457443-457477-457487-457405-457414-457511-457594-457432-397846-457408-457421-457435-457489-457563-457567-457569-457439-457493-457453-457406-457416-457418-457426-457400-457404-457409-457419-457420-457427-457448-457483-457425-457428-457415-457504-457597-457566-457412-457457-457436-457463-397845-397844-457411-457497-457424-457429-457430-457442-457470-404659-457596-457407-457410-457593&insurance_sector=public&practice_ids=158434&destroy_temporary=true&limit=4`,
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434`,
  },
  {
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2733996&agenda_ids=56915&insurance_sector=public&practice_ids=22563&destroy_temporary=true&limit=4`,
    bookingLink: `https://www.doctolib.de/praxis/berlin/hno-praxis-rafael-hardy?insurance_sector=public`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=397800-397776-402408-397766&insurance_sector=public&practice_ids=158431&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=404654-457215-457244-397972-457210-457239-457213-457278-457283-457304-457306-457229-457234-457299-457212-457216-457288-457291-457315-457227-457204-457237-457296-397974-457312-457280-457206-457310-457319-397973-457243-457208-457218-457245-457274-457321&insurance_sector=public&practice_ids=158435&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436`,
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457379-457323-457329-457334-457346-457253-457255-457256-457294-457317-457335-457399-457514-457350-457326-457330-457254-457267-457303-457275-457276-457281-457289-457300-457301-457302-457307-457309-457314-457331-457388-457515-457338-457263-457266-457277-457286-457287-457308-457320-457343-457268-457500-397841-457512-457382-457385-457324-457460-457513-457285-457392-457395-457251-397843-457252-457264-457271-457279-457290-457292-457318-457358-457327-457341-457293-457250-457305-457377-457396-457333-457349-457265-457313-457316-457295-457390-457363-457282-457297-397842-457336-457337-457413-404656-457510&insurance_sector=public&practice_ids=158436&destroy_temporary=true&limit=4`,
  },
];

data.forEach((links) => {
  observe(links.xhrLink, links.bookingLink);
});


observeImpfstoff();
