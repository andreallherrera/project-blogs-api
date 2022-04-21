const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  const { name } = req.body;
  const response = await categoryService.create({ name });
  res.status(response.status).json(response.content);
};

module.exports = { create };