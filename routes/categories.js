const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const categoryController = require('../controllers/categoryController');

const app = express();

app.post('/', tokenMiddleware.verifyToken, categoryController.create);

module.exports = app;