<div align="center">

<!-- Title -->

<h1>Minroll</h1>

<!-- Badges -->

<p>
    <a href="">
        <img src="https://img.shields.io/github/last-commit/czhangy/minroll" alt="last update" />
    </a>
    <a href="https://github.com/czhangy/minroll/stargazers">
        <img src="https://img.shields.io/github/stars/czhangy/minroll" alt="stars" />
    </a>
    <a href="https://github.com/czhangy/minroll/issues/">
        <img src="https://img.shields.io/github/issues/czhangy/minroll" alt="open issues" />
</p>
<h4>
    <a href="https://github.com/czhangy/minroll">Documentation</a>
    <span> · </span>
    <a href="https://github.com/czhangy/minroll/issues">Report Bug</a>
</h4>

</div>

<br />

<!-- Table of Contents -->

# Table of Contents

-   [About the Project](#about-the-project)
    -   [Tech Stack](#tech-stack)
    -   [Features](#features)
    -   [Color Reference](#color-reference)
    -   [Environment Variables](#environment-variables)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Run Locally](#run-locally)
-   [Usage](#usage)
-   [Roadmap](#roadmap)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

<!-- Summary -->

### Summary

Minroll is a utility web application for Diablo III. It aims to provide a minimalistic experience of the popular site Maxroll, containing only tier lists, a build planner, and community builds. Development for this project is ongoing, and major features are still under development.

The most up-to-date version of Minroll is currently deployed at: https://minroll.vercel.app/.

<!-- Tech Stack -->

### Tech Stack

<details>
    <summary>Client</summary>
    <br />
    <a href="https://reactjs.org/">
        <img src="https://img.shields.io/badge/reactjs-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="ReactJS" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" />
    </a>
    <a href="https://www.typescriptlang.org">
        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://sass-lang.com/">
        <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
    </a>
</details>

<details>
    <summary>Server</summary>
    <br />
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" />
    </a>
    <a href="https://www.typescriptlang.org">
        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://www.prisma.io/">
        <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    </a>
</details>

<details>
    <summary>Database</summary>
    <br />
    <a href="https://www.postgresql.org/">
        <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
    </a>
</details>

<details>
    <summary>Deployment</summary>
    <br />
    <a href="https://www.vercel.com/">
        <img src="https://img.shields.io/badge/-vercel-black?logo=vercel&logoColor=white&style=for-the-badge" alt="Vercel" />
    </a>
</details>
<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

-   `DATABASE_URL`
-   `BNET_ID`
-   `BNET_SECRET`

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses NPM as a package manager

<!-- Run Locally -->

### Run Locally

Clone the project

```bash
  git clone https://github.com/czhangy/minroll.git
```

Install dependencies

```bash
  npm install
```

Start the application

```bash
  npm run dev
```

<!-- Roadmap -->

## Roadmap

-   [x] Build out Nav

    -   [x] Navbar with router links
    -   [x] Footer with social links
    -   [x] Nav menu for mobile displays

-   [x] Build Home Page

    -   [x] Welcome text
    -   [x] Link to login page

-   [x] Collect data

    -   [x] Gather all gear data/assets

-   [x] Build Build Sheet Component

    -   [x] Gear section
    -   [x] Skills section
    -   [x] Passives section
    -   [x] Kanai's Cube section
    -   [x] Gem sockets
    -   [x] Hoverable for data

-   [x] Build GET API routes

    -   [x] Fetch gear by class
    -   [x] Fetch skills by class
    -   [x] Fetch passives by class
    -   [x] Fetch gems

-   [ ] Build Builds Page

    -   [ ] Main page with list of builds

        -   [ ] Sortable by class/set
        -   [ ] Pagination

    -   [x] Specific build page accessed by ID

        -   [x] Build sheet
        -   [ ] Copyable
        -   [ ] Mobile?
        -   [ ] Scroll

-   [ ] Build Tiers Page

    -   [ ] List with links to individual builds

-   [x] Build Planner Page

    -   [x] Class selection
    -   [x] Gear selection
    -   [x] Skill selection
    -   [x] Passives selection
    -   [x] Cube selection
    -   [x] Gem selection
    -   [x] Changes display on build
    -   [x] Save functionality
    -   [x] Local storage

-   [x] Build Auth Pages

    -   [x] Login form
    -   [x] Register form
    -   [ ] Redirect from `/login` and `/register` when logged in

-   [ ] Build Profile Page

    -   [x] Display username
    -   [x] Logout button
    -   [x] List of saved builds

        -   [ ] Update functionality
        -   [x] Delete functionality
        -   [x] Show more functionality
        -   [ ] Sort by functionality

    -   [ ] Redirect on unauthorized

-   [ ] Build other API routes

    -   [x] Auth routes
    -   [x] POST route for builds
    -   [ ] PUT route for builds
    -   [ ] DELETE route for builds

-   [ ] Build About Page

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- Contact -->

## Contact

#### Charles Zhang:

<a href="https://www.linkedin.com/in/charles-zhang-14746519b/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/czhangy_">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>
<a href="https://czhangy.io">
    <img src="https://img.shields.io/badge/-personal%20site-darkgrey?logo=code-review&logoColor=white&style=for-the-badge" alt="Personal Site" />
</a>

<!-- Acknowledgments -->

## Acknowledgements

-   [Awesome README](https://github.com/matiassingers/awesome-readme)
-   [Shields.io](https://shields.io/)
-   [Maxroll](https://maxroll.gg/)
-   [Battle.net API](https://develop.battle.net/documentation/diablo-3/game-data-apis)
-   [BlizzAPI](https://blizzapi.lukem.net/)
