const jwt = require('../utils/jwt');
const { status, messages } = require('../utils/errors');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined || token === '') {
    return res.status(status.unauthorized).json({ message: messages.TOKEN_NOT_FOUND });
  }
  const verified = jwt.validateJWT(token);
  if (!verified) return res.status(status.unauthorized).json({ message: messages.INVALID_TOKEN });
  next();
};

module.exports = { verifyToken };