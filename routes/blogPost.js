const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const app = express();

app.post('/', tokenMiddleware.verifyToken);

module.exports = app;