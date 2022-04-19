const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const app = express();

app.post('/', userMiddleware.validateParams, userController.create);

module.exports = app;