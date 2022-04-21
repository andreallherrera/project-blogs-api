const userService = require('../services/userService');

const create = async (req, res) => {
  const user = req.body;
  const response = await userService.create(user);
  res.status(response.status).json(response.content);
};

const read = async (_req, res) => {
  const response = await userService.read();
  res.status(response.status).json(response.content);
};

const readOne = async (req, res) => {
  const { id } = req.params;
  const response = await userService.readById(id);
  res.status(response.status).json(response.content);
};

module.exports = { create, read, readOne };