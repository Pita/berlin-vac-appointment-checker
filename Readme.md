# Doctolib Berlin Vaccination Appointment Checker

Small node.js script that checks various sources if vaccination appointments are available. If so, immediately opens a browser window for you so you can book quickly.

Currently its configured to check all known sources and vaccines. If you want to fine tune which vaccines you looks for, what sources you search, or which shot you need, [please change your config accordingly](https://github.com/Pita/berlin-vac-appointment-checker/tree/main/src/config.ts)

# Usage

[Install node if you have not already](https://nodejs.org/en/download/)

clone the repo or, if you do not have git, [download this zip](https://github.com/Pita/berlin-vac-appointment-checker/archive/refs/heads/main.zip) and extract it. (it's a zip of this repo)

Go to the repo folder in the command line. If you are windows and having issues, [this can help](https://stackoverflow.com/questions/31217771/change-directory-in-node-js-command-prompt).


```
npm install
npm start
```

This script was last tested by a dev June 3, 2021. If Doctolib changes their API, it might stop working. Confirmed working on Mac OS as well as Windows.

# Contribution

Contributions are welcome :). Also notice the TODO issues.
