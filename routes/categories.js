const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const categoryController = require('../controllers/categoryController');

const app = express();

app.use(tokenMiddleware.verifyToken);

app.post('/', categoryController.create);
app.get('/', categoryController.read);

module.exports = app;