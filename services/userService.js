const { User } = require('../models');

const create = async (user) => {
  const newUser = await User.create(user);
  console.log(newUser.dataValues);
  return newUser;
};

module.exports = { create };