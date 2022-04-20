const express = require('express');
const logingMiddleware = require('../middlewares/loginMiddleware');

const app = express();

app.post('/', logingMiddleware.validateParams);

module.exports = app;