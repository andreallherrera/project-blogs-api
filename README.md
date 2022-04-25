# BLOGS API

## Description
This project was about creating an REST API with CRUD using Sequelize and MSC architecture. The project uses a relational database MySQL and it has unit tests in Mocha, Chai and Sinon.
<img src="blogs.png" alt="database structure">

## Tools
* NodeJs w/ ExpressJs
* MySQL
* Sequelize
* Joi
* JWT 
* Mocha/ Chai / Sinon

## Install
Clone this project and install all the dependencies 
```sh
  npm install
```
Create a .env file like this:
``` javascript
 MYSQL_USER=root
  MYSQL_PASSWORD=aPassword
  HOSTNAME=localhost
  PORT=3000
  JWT_SECRET=anySecret
```
Running the following command you will create the database tables and seed them:
```sh
npm run prestart
```
```sh
npm run seed
```
For debugging run: 
```sh
npm run debug
```

Now you can use <a href="https://www.postman.com/">Postman</a>, <a href="https://www.thunderclient.com/">Thunder Client</a> or <a href="https://insomnia.rest/">Insomnia</a> for making the requests to the endpoints.

You can also give a look to the <a href="https://bootcamp.rocketacademy.co/4-backend-structure/4.1-orm-sequelize/4.1.9-sequelize-setup-cheatsheet">Sequelize Setup Cheatsheet</a> made by Rocket Academy.

## 🟢 Endpoints
#### User
* POST /user
* GET /user
* GET /user/:id
* DELETE /user/:id

#### Login
* POST /login

#### Category
* POST /categories
* GET /categories

#### Blog post
* POST /post
* GET /post
* GET /post/search
* GET /post/:id
* PUT /post/:id
* DELETE /post/:id