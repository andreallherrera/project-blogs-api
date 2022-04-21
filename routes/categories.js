const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const categoryController = require('../controllers/categoryController');

const app = express();

app.post('/', tokenMiddleware.verifyToken, categoryController.create);
app.get('/', tokenMiddleware.verifyToken, categoryController.read);

module.exports = app;