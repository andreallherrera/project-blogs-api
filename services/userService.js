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

module.exports = { create, readByEmail };