Koa-awesome-boilerplate
====================

[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]

-------------------------------------------

#### On this page:

* [Common Setup](#markdown-header-common-setup)

* [Bootstrapping](#markdown-header-bootstrapping)

* [Docker Setup](#markdown-header-docker-setup)

* [Compose](#markdown-header-compose)

* [Cloud platform](#markdown-header-cloud-platform)

* [Payment gateway](#markdown-header-payment-gateway)

#### Built with:

:one: [Koa](https://koajs.com)

:two: [Sequelize](http://sequelize.org/)

:three: [Redis](https://upstash.com/?gclid=Cj0KCQiA4L2BBhCvARIsAO0SBdYPep1_u1P1S64F9MUXEgzjw_ymwraL0Jd4lrjJHHCLCaIxqjYteQcaAvhtEALw_wcB)

:four: [Stripe](https://stripe.com/)

:five: [PayPal](https://www.paypal.com/ru/home/)

:six: [Socket.io](https://socket.io/)

:seven: [Sendgrid](https://sendgrid.com/solutions/email-api/)

:eight: [EJS](https://ejs.co/)

:nine: [Npm modules](https://www.npmjs.com/)

-------------------------------------------

Package name     | Packages contains
-----------------|----------------------
components       | aws, google, payment methods
config           | DB configurations
constants        | Project constants
data             | DB tables structure
handlers         | Controllers
middlewares      | A layer of technology software to ensure interaction between different process
routes           | Project routing
services/task    | Notifications and mailer controllers
views            | Custom pdf view

-------------------------------------------

File name        | File content
-----------------|------------------------
index.js         | For the build project
.sequelizerc     | This is a special configuration file. It lets you specify following options that you would usually pass as arguments to CLI:
.eslintrc        | Project architecture styles
package.json     | Saved npm modules versions and npm scripts
.env             | Create `.env` file under project main directory by copying `.env.example` file

## Common Setup

Clone the repository

````bash
git clone https://github.com/ArtashMardoyan/koa-awesome-boilerplate.git
cd koa-awesome-boilerpalte
````

Engine versions

````bash
node: '>=10.0.0',
npm:  '>=6.5.0',
yarn: '>=1.19.1'
````

Install dependencies

````bash
yarn install
````

To start the [koa](https://koajs.com/) server, run the following command

````bash
yarn start
    or
node index.js
````

## Bootstrapping

````bash
npx sequelize-cli init

This will create following folders

Folder name | Folder contains
------------|------------------------
config      | contains config file, which tells CLI how to connect with database
models      | contains all models for your project
migrations  | contains all migration files
seeds       | contains all seed files
````

You will need Sequelize CLI. The CLI ships support for migrations and project bootstrapping.

````bash
yarn migrate-up
yarn migrate-down
yarn seed-up
yarn seed-down
````

## Docker Setup

You can also run this application as a [Docker](https://www.docker.com/) container

Build the Docker image

````bash
docker build . -t koa-awesome-boilerpalte
````

To list the docker images, run the following command

````bash
docker images
````

To remove the docker image, run the following command

````bash
docker rmi $image_id 
````

"After" successfully creating the image you can run the container by following command

````bash
docker run -d --name koa-awesome-boilerpalte -p 3000:3000 connect-app . 
````

To list the running docker containers, run the following command

````bash
docker ps
````

To list all container (stopped or running), run the following command

````bash
docker ps -a
````

To stop the running container, run the following command

````bash
docker stop $container_id
````

To start the stopped container, run the following command

````bash
docker start $container_id
````

To remove the docker container, run the following command

`NOTE: before removing the container, you have to stop that`

````bash
docker rm $container_id 
````

To force remove the docker container (remove running container), run the following command

````bash
docker rm -f $container_id 
````

## Compose

You can also run this application using [docker-compose](https://docs.docker.com/compose/) file, by running the
following command

````bash
docker-compose up -d 
````

To stop,remove containers and networks created by `up`, run the following command

````bash
docker-compose down
````

You can also run by the following commands

````bash
npm run build
npm run deploy
````

`NOTE:check npm scripts in package.json file`

## Cloud Platform

We're using Cloud computing with the AWS services

## Payment Gateway

For transactions used some payment methods such as Stripe and PayPal

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://linkedin.com/in/artash-mardoyan/
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/ArtashMardoyan/koa-awesome-boilerplate/blob/master/LICENSE.txt

