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

- Now when i think of this project, several things that needs to be aknowledged.
  - I didn't use any validation library and stick mainly with REGEX, so it might introduce some problem
  - Still don't quite understand how works methods of Date, toLocaleString, toUTFString, etc... IN my country format is dd.mm.yyyy; but my laptop seems to be so confused, because here i setup main language as English and now format mm/dd/yyyy. I need to test it in different env, i guess...
  - This project is evolved from 'basic drawing table from a json data' to 'OMG postgres docker containers submit forms let's do it(why not React though?)'. And it shows. Inputs for name are three different inputs for each part of the fullname, and on the fetch(GET)method I use fetchData() to get it simple. As far as i know it relies heavily on input names and mathc it with names of columns in database. So now i can't just make one input and somehow transfer data further. At least now that simple, i guess. Need to dig in it more later.

### TODO

- Delete the user
- Update user info
- Create modal window for adding and searching
- Give up on Bootstrap in favor of pure CSS

## Project status

Project is: _in progress_

## Contacts

Created by [@sashauly](https://t.me/sashauly) - feel free to contact me!
