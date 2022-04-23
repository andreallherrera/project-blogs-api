const { BlogPost, User, Category } = require('../models');
const { status, messages } = require('../utils/errors');

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

const readOne = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  if (!blogPost) return { status: status.notFound, content: { message: messages.POST_NOT_FOUND } };
  return { status: status.ok, content: blogPost.dataValues };
};

const update = async (id, body) => {
  await BlogPost.update({ ...body, updated: new Date() }, { where: { id } });
  const { content: { title, content, userId, categories } } = await readOne(id);
  return { status: status.ok, content: { title, content, userId, categories } };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { status: status.noContent, content: null };
};

module.exports = { create, read, readOne, update, deletePost };