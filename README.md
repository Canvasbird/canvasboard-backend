# Canvasboard Backend

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

<img src="https://img.shields.io/badge/We%20❤-NodeJS-green?style=for-the-badge"> [![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=for-the-badge)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Overview 👀

#### Canvasboard is an interactive board with plugins focusing on replacing the need of multiple platforms for teaching, presenting, managing or explaining your ideas.

#### The interactive plugins are built using web technologies to ease your work right within a single platform, this repo adds the esence of being a true full stack project.

## Running Backend 🏃🏻‍♂️

```
> Clone the repo
> $ cd canvasboard-backend/apis
> $ npm ci
> rename .env_template to .env
> fill in the credentials in .env files
```

**Local Run 💻**

```
> $ cd canvasboard-backend/apis
> $ npm ci
> $ npm start
> APIs runs on port 4000
```
<img src="https://user-images.githubusercontent.com/20599925/138544885-5fa7ec30-e1ca-4ec6-98c9-6d72a406259a.png" width="600"/>

**Running the Unit Tests 
🔧**
```
> $ cd canvasboard-backend/apis
> $ npm ci
> $ npm test
```
<img src = "https://media.discordapp.net/attachments/845744017056858172/976570039614451832/Screenshot_from_2022-05-19_01-08-41.png" width="600"/>



**Docker Run 🚢**

```
> make sure you have docker up and running
> make sure port 4000 is free
> set node_env=prod in .env file
> $ cd canvasboard-backend
> $ docker-compose up --build
> APIs runs on port 4000
```

## API Docs 📘

```
> cd canvasboard-backend/apis/apiDocs/
> select the folder depending the flow
> make sure you have postman installed
> import the <filename>.postman_collection in postman
```

### Tech Stack 🧐

<p align="left"> <a href="https://www.docker.com/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.nginx.com" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/NavaneethNivol"><img src="https://avatars0.githubusercontent.com/u/33155848?v=4" width="100px;" alt=""/><br /><sub><b>I'm Navaneeth Nivol</b></sub></a><br /><a href="https://github.com/Canvasbird/canvasboard-backend/commits?author=NavaneethNivol" title="Code">💻</a> <a href="#maintenance-AsishRaju" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/AyonPal"><img src="https://avatars3.githubusercontent.com/u/17457713?v=4" width="100px;" alt=""/><br /><sub><b>Ayon Pal</b></sub></a><br /><a href="https://github.com/Canvasbird/canvasboard-backend/commits?author=AyonPal" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AsishRaju"><img src="https://avatars0.githubusercontent.com/u/41658324?v=4" width="100px;" alt=""/><br /><sub><b>Asish Raju</b></sub></a><br /><a href="https://github.com/Canvasbird/canvasboard-backend/commits?author=AsishRaju" title="Code">💻</a> <a href="#maintenance-AsishRaju" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
