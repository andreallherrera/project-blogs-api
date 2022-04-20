const loginSchema = require('../schemas/loginSchema');
const userService = require('../services/userService');
const jwt = require('../utils/jwt');
const { status, messages } = require('../utils/errors');

const verifyLogin = async (email, password) => {
  const errorResponse = { status: status.badRequest, 
    content: { message: messages.INVALID_FIELDS } };
  const user = await userService.readByEmail(email);
  if (user.content === null) return errorResponse;
  if (user.content.password !== password) return errorResponse;
  const token = jwt.generateToken({ email, password });
  return { status: status.ok, content: { token } };
};

const validateParams = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.message });
  const verifiedLogin = await verifyLogin(email, password);
  return res.status(verifiedLogin.status).json(verifiedLogin.content);
};

module.exports = { validateParams };