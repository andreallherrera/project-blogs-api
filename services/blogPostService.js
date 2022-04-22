const { BlogPost, User, Category } = require('../models');
const { status } = require('../utils/errors');

const create = async (params) => {
  const blogPost = await BlogPost.create(params);
  return { status: status.created, content: blogPost.dataValues };
};

const read = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: status.ok, content: blogPosts };
};

module.exports = { create, read };