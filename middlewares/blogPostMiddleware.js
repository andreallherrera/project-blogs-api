const { schema, updateSchema } = require('../schemas/blogPostSchema');
const { status, messages } = require('../utils/errors');
const categoryService = require('../services/categoryService');
const blogPostService = require('../services/blogPostService');
const jwt = require('../utils/jwt');

const verifyIfCategoriesExists = async (categories) => {
  const existingCat = await Promise.all(categories
    .map((cat) => categoryService.readOne(cat)));
  if (existingCat.some((c) => c.content === null)) {
    return { status: status.badRequest, content: { message: messages.CATEGORY_NOT_FOUND } };
  }
};

const validateParams = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = schema.validate({ title, content, categoryIds });
  if (error) return res.status(status.badRequest).json({ message: error.message });
  const verifiedCategories = await verifyIfCategoriesExists(categoryIds);
  if (verifiedCategories) return res.status(status.badRequest).json(verifiedCategories.content);
  next();
};

const verifyUser = async (req, res, next) => {
  const { id } = jwt.validateJWT(req.headers.authorization);
  const blogPost = await blogPostService.readOne(req.params.id);
  if (blogPost.status === 404) {
    return res.status(blogPost.status).json(blogPost.content);
  }
  if (id !== blogPost.content.userId) {
    return res.status(status.unauthorized).json({ message: messages.UNAUTHORIZED_USER });
  }
  next();
};

const validateUpdateParams = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (categoryIds) return res.status(status.badRequest).json({ message: messages.EDIT_CATEGORIES });
  const { error } = updateSchema.validate({ title, content });
  if (error) return res.status(status.badRequest).json({ message: error.message });
  next();
};

module.exports = { validateParams, verifyUser, validateUpdateParams };