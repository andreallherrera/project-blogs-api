const { BlogPost } = require('../models');
const { status } = require('../utils/errors');

const create = async (params) => {
  const blogPost = await BlogPost.create(params);
  return { status: status.created, content: blogPost.dataValues };
};

module.exports = { create };