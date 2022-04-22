const blogPostService = require('../services/blogPostService');
const jwt = require('../utils/jwt');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { id } = jwt.validateJWT(req.headers.authorization);
  const params = { title, content, userId: id, published: new Date(), updated: new Date() };
  const response = await blogPostService.create(params);
  res.status(response.status).json(response.content);
};

const read = async (_req, res) => {
  const response = await blogPostService.read();
  res.status(response.status).json(response.content);
};

const readOne = async (req, res) => {
  const { id } = req.params;
  const response = await blogPostService.readOne(id);
  res.status(response.status).json(response.content);
};

module.exports = { create, read, readOne };