require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const token = jwt.sign(user, JWT_SECRET, jwtConfig);
  return token;
};

const validateJWT = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  generateToken,
  validateJWT,
};