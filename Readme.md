# Doctolib Berlin Vaccination Appointment Checker

Small node.js script that checks in short periods if Doctolib has a vaccination appointment available. If so, immediately opens a browser window for you so you can book quickly. This script worked mid of May 2021. If Doctolib changes their API, it might stop working. Only tested on intel Mac OS X.

Currently its configured to only check the [Havelhöhe Hospital](https://www.doctolib.de/krankenhaus/berlin/gkh-havelhoehe-impfzentrum) which is admittedly a bit hard to get to and only offers AstraZeneca. But it was the only place that worked for me to get a short time appointment. You can configure the code to check more places for vaccination appointments, see the comments in the code on how to do that.

# Usage

```
npm install
npm start
```
