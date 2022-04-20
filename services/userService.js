const { User } = require('../models');
const jwt = require('../utils/jwt');

const create = async (user) => {
  const newUser = await User.create(user);
  const token = jwt.generateToken(newUser.dataValues);
  return { status: 201, content: { token } };
};

const readByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: 200, content: user };
};

const read = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 200, content: users };
};

module.exports = { create, readByEmail, read };