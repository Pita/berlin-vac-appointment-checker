# Doctolib Berlin Vaccination Appointment Checker

Small node.js script that checks in short periods if Doctolib has a vaccination appointment available. If so, immediately opens a browser window for you so you can book quickly. This script was last tested by a dev June 1, 2021. If Doctolib changes their API, it might stop working. Only tested on intel Mac OS X.

Currently its configured to check all known sources. In the case that there is a separate link for the second vacciation, the second ones are commemnted out for clarity of initial use. You can configure which places are checked for vaccination appointments [in demon.js](https://github.com/Pita/berlin-vac-appointment-checker/blob/main/demon.js), see the comments in the code on how to do that.

# Usage

```
npm install
npm start
```
