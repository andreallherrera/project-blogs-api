const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const blogPostMiddleware = require('../middlewares/blogPostMiddleware');
const blogPostController = require('../controllers/blogPostController');

const app = express();
app.use(tokenMiddleware.verifyToken);

app.post('/', blogPostMiddleware.validateParams, blogPostController.create);
app.get('/', blogPostController.read);
app.get('/:id', blogPostController.readOne);
app.put('/:id', blogPostMiddleware.verifyUser, blogPostMiddleware.validateUpdateParams, 
  blogPostController.update);
app.delete('/:id', blogPostMiddleware.verifyUser, blogPostController.deletePost);

module.exports = app;