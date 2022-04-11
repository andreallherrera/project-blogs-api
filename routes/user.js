const express = require('express');
const userController = require('../controllers/userController');

const app = express();

app.post('/', userController.create);

module.exports = app;