const { Category } = require('../models');
const { status } = require('../utils/errors');
const categorySchema = require('../schemas/categorySchema');

const create = async (name) => {
  const { error } = categorySchema.validate(name);
  if (error) return { status: status.badRequest, content: { message: error.message } };
  const category = await Category.create(name);
  return { status: status.created, content: category.dataValues };
};

const read = async () => {
  const categories = await Category.findAll({ raw: true });
  return { status: 200, content: categories };
};

module.exports = { create, read };