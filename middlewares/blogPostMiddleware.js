const blogPostSchema = require('../schemas/blogPostSchema');
const categoryService = require('../services/categoryService');
const { status, messages } = require('../utils/errors');

const verifyIfCategoriesExists = async (categories) => {
  const existingCat = await Promise.all(categories
    .map((cat) => categoryService.readOne(cat)));
  if (existingCat.some((c) => c.content === null)) {
    return { status: status.badRequest, content: { message: messages.CATEGORY_NOT_FOUND } };
  }
};

const validateParams = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = blogPostSchema.validate({ title, content, categoryIds });
  if (error) return res.status(status.badRequest).json({ message: error.message });
  const verifiedCategories = await verifyIfCategoriesExists(categoryIds);
  if (verifiedCategories) return res.status(status.badRequest).json(verifiedCategories.content);
  next();
};

module.exports = { validateParams };