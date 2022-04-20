const userService = require('../services/userService');

const create = async (req, res) => {
  const user = req.body;
  const response = await userService.create(user);
  res.status(response.status).json(response.content);
};

const read = async (req, res) => {
  const response = await userService.read();
  res.status(response.status).json(response.content);
};

module.exports = { create, read };