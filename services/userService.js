const { User } = require('../models');
const { status, messages } = require('../utils/errors');
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
  const users = await User.findAll({ attributes: { exclude: ['password'] }, raw: true });
  return { status: 200, content: users };
};

const readById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (user === null) {
    return { status: status.notFound, content: { message: messages.USER_NOT_EXISTS } };
  }
  return { status: 200, content: user };
};

module.exports = { create, readByEmail, read, readById };