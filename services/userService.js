const { User } = require('../models');
const { status, messages } = require('../utils/errors');
const jwt = require('../utils/jwt');

const create = async (user) => {
  const newUser = await User.create(user);
  const token = jwt.generateToken(newUser.dataValues);
  return { status: status.created, content: { token } };
};

const readByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: status.ok, content: user };
};

const read = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] }, raw: true });
  return { status: status.ok, content: users };
};

const readById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (user === null) {
    return { status: status.notFound, content: { message: messages.USER_NOT_EXISTS } };
  }
  return { status: status.ok, content: user };
};

const deleteMe = async (token) => {
  const { id } = jwt.validateJWT(token);
  await User.destroy({ where: { id } });
  return { status: status.noContent, content: null };
};
module.exports = { create, readByEmail, read, readById, deleteMe };