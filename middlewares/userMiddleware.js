const userSchema = require('../schemas/userSchema');
const userService = require('../services/userService');
const { messages } = require('../utils/errors');

const validateParams = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) return res.status(400).json({ message: error.message });
  const user = await userService.readByEmail(email);
  if (user.content) return res.status(409).json({ message: messages.USER_REGISTERED });
  next();
};

module.exports = { validateParams };