const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const app = express();

app.post('/', userMiddleware.validateParams, userController.create);
app.get('/', tokenMiddleware.verifyToken);

module.exports = app;