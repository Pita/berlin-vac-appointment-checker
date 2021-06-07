import { IndividualLinks } from "../demon.types";

/**
 * Comment out places you do not want to be checked.
 *
 * Some second shots are listed separately as they are listed seperately
 * on the doctor's page. in order to not confuse an initial user, these
 * are commented out by default
 */
const individualLinks: IndividualLinks = [
  {
    bookingLink:
      "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg",
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2764198&agenda_ids=190434&insurance_sector=public&practice_ids=114976&destroy_temporary=true&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg",
    shot: "second",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2764199&agenda_ids=190434&insurance_sector=public&practice_ids=114976&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/allgemeinmedizin/berlin/sophie-ruggeberg",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2886231&agenda_ids=190434&insurance_sector=public&practice_ids=114976&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh",
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2862419&agenda_ids=305777&insurance_sector=public&practice_ids=120549&destroy_temporary=true&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh",
    shot: "second",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2862420&agenda_ids=305777&insurance_sector=public&practice_ids=120549&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/facharzt-fur-hno/berlin/babak-mayelzadeh",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2879179&agenda_ids=305777&insurance_sector=public&practice_ids=120549&limit=4",
  },
  {
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-05-30&visit_motive_ids=2733996&agenda_ids=56915&insurance_sector=public&practice_ids=22563&destroy_temporary=true&limit=4",
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
    shot: "first",
    vaccine: "biontech",
    bookingLink: "https://www.doctolib.de/facharzt-fur-hno/berlin/rafael-hardy",
  },
  {
    bookingLink:
      "https://www.doctolib.de/innere-und-allgemeinmediziner/berlin/oliver-staeck",
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2784656&agenda_ids=268801&insurance_sector=public&practice_ids=178663&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/innere-und-allgemeinmediziner/berlin/oliver-staeck",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885945&agenda_ids=268801&insurance_sector=public&practice_ids=178663&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln",
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811460&agenda_ids=464751&insurance_sector=public&practice_ids=28436&destroy_temporary=true&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln",
    shot: "second",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811461&agenda_ids=464751&insurance_sector=public&practice_ids=28436&limit=4",
    vaccine: "astrazeneca",
  },
  {
    bookingLink:
      "https://www.doctolib.de/praxis/berlin/praxis-fuer-orthopaedie-und-unfallchirurgie-neukoelln",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2811530&agenda_ids=464773&insurance_sector=public&practice_ids=28436&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum",
    shot: "first",
    vaccine: "biontech",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2757216&agenda_ids=439400&insurance_sector=public&practice_ids=107774&destroy_temporary=true&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum",
    shot: "second",
    vaccine: "biontech",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2757217&agenda_ids=439400&insurance_sector=public&practice_ids=107774&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum",
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885841&agenda_ids=480139&insurance_sector=public&practice_ids=107774&destroy_temporary=true&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum",
    shot: "second",
    vaccine: "astrazeneca",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2885842&agenda_ids=480139&insurance_sector=public&practice_ids=107774&limit=4",
  },
  {
    bookingLink:
      "https://www.doctolib.de/medizinisches-versorgungszentrum-mvz/berlin/ambulantes-gynaekologisches-operationszentrum",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2880391&agenda_ids=480095&insurance_sector=public&practice_ids=107774&limit=4",
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158434`,
    secondShotXhrLink: `https://www.doctolib.de/second_shot_availabilities.json?start_date=2021-06-28&visit_motive_ids=2495719&agenda_ids=457591-457443-457477-457487-457405-457414-457511-457594-457432-397846-457408-457421-457435-457489-457563-457567-457569-457439-457493-457453-457406-457416-457418-457426-457400-457404-457409-457419-457420-457427-457448-457483-457425-457428-457415-457504-457597-457566-457412-457457-457436-457463-397845-397844-457411-457497-457424-457429-457430-457442-457470-404659-457596-457407-457410-457593&first_slot=2021-05-19T13%3A30%3A00.000%2B02%3A00&insurance_sector=public&practice_ids=158434&limit=4`,
    shot: "first",
    vaccine: "biontech",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457591-457443-457477-457487-457405-457414-457511-457594-457432-397846-457408-457421-457435-457489-457563-457567-457569-457439-457493-457453-457406-457416-457418-457426-457400-457404-457409-457419-457420-457427-457448-457483-457425-457428-457415-457504-457597-457566-457412-457457-457436-457463-397845-397844-457411-457497-457424-457429-457430-457442-457470-404659-457596-457407-457410-457593&insurance_sector=public&practice_ids=158434&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158431`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
    shot: "first",
    vaccine: "biontech",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=397800-397776-402408-397766&insurance_sector=public&practice_ids=158431&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158435`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
    shot: "first",
    vaccine: "biontech",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=404654-457215-457244-397972-457210-457239-457213-457278-457283-457304-457306-457229-457234-457299-457212-457216-457288-457291-457315-457227-457204-457237-457296-397974-457312-457280-457206-457310-457319-397973-457243-457208-457218-457245-457274-457321&insurance_sector=public&practice_ids=158435&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-158436`,
    // secondShotXhrLink: "" // this must have a second shot Xhr but i cant see it unless i get to the page
    shot: "first",
    vaccine: "biontech",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-05-11&visit_motive_ids=2495719&agenda_ids=457379-457323-457329-457334-457346-457253-457255-457256-457294-457317-457335-457399-457514-457350-457326-457330-457254-457267-457303-457275-457276-457281-457289-457300-457301-457302-457307-457309-457314-457331-457388-457515-457338-457263-457266-457277-457286-457287-457308-457320-457343-457268-457500-397841-457512-457382-457385-457324-457460-457513-457285-457392-457395-457251-397843-457252-457264-457271-457279-457290-457292-457318-457358-457327-457341-457293-457250-457305-457377-457396-457333-457349-457265-457313-457316-457295-457390-457363-457282-457297-397842-457336-457337-457413-404656-457510&insurance_sector=public&practice_ids=158436&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum`,
    shot: "first",
    vaccine: "astrazeneca",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2836657&agenda_ids=469719&insurance_sector=public&practice_ids=162056&destroy_temporary=true&limit=4`,
  },
  {
    bookingLink: `https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum`,
    shot: "second",
    vaccine: "astrazeneca",
    xhrLink: `https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2836662&agenda_ids=469719&insurance_sector=public&practice_ids=162056&limit=4`,
  },
  {
    bookingLink:
      "https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum",
    shot: "first",
    vaccine: "johnsonAndJohnson",
    xhrLink:
      "https://www.doctolib.de/availabilities.json?start_date=2021-06-01&visit_motive_ids=2898162&agenda_ids=469719&insurance_sector=public&practice_ids=162056&limit=4",
  },
];

export default individualLinks;
