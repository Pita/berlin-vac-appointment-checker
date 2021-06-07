# Doctolib Berlin Vaccination Appointment Checker
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://knoblau.ch"><img src="https://avatars.githubusercontent.com/u/1480168?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sadie Braun</b></sub></a><br /><a href="https://github.com/Pita/berlin-vac-appointment-checker/commits?author=mousemke" title="Code">💻</a></td>
    <td align="center"><a href="https://jozr.io/"><img src="https://avatars.githubusercontent.com/u/8154741?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josephine Wright</b></sub></a><br /><a href="https://github.com/Pita/berlin-vac-appointment-checker/commits?author=jozr" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!