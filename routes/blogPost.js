const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const blogPostMiddleware = require('../middlewares/blogPostMiddleware');
const blogPostController = require('../controllers/blogPostController');

const app = express();

app.post('/', tokenMiddleware.verifyToken, 
  blogPostMiddleware.validateParams, blogPostController.create);
app.get('/', tokenMiddleware.verifyToken, blogPostController.read);
app.get('/:id', tokenMiddleware.verifyToken, blogPostController.readOne);

module.exports = app;