# data-tables-JS-REST-Postgres

![Overview](./img/overview.png)
> Simple project with my own implemented REST API and Postgresql database.
>

## Table of contents

- [data-tables-JS-REST-Postgres](#data-tables-js-rest-postgres)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Features](#features)
    - [TODO](#todo)
  - [Project status](#project-status)
  - [Contacts](#contacts)

## General info

Simple project with my own implemented REST API and Postgresql database.

## Technologies

Project is created with:

- JavaScript ES6
- [NodeJS](https://nodejs.org/en)
- My own written REST API
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Bootstrap](https://getbootstrap.com/)

## Setup

To run this project, first you need to clone repository:

`git clone git@github.com:sashauly/student-info-js.git`

Then run Docker containers with NodeJS REST API and postgres database:

`cd data-tables-JS-REST-Postgres/src/api && docker-compose up && cd ../`

Then you need to open up an html file in your browser:

For Linux: `xdg-open index.html`

For Mac: `open index.html`

## Features

- Working with database
- Sorting by columns
- Filter by columns

### TODO

- Delete the user
- Update user info
- Create modal window for adding and searching
- Give up on Bootstrap in favor of pure CSS

## Project status

Project is: _in progress_

## Contacts

Created by [@sashauly](https://t.me/sashauly) - feel free to contact me!
