const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const app = express();

app.post('/', userMiddleware.validateParams, userController.create);
app.get('/', tokenMiddleware.verifyToken, userController.read);
app.get('/:id', tokenMiddleware.verifyToken, userController.readOne);

module.exports = app;