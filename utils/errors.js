const status = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
};

const messages = {
  USER_REGISTERED: 'User already registered',
  INVALID_FIELDS: 'Invalid fields',
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN: 'Expired or invalid token',
  USER_NOT_EXISTS: 'User does not exist',
  CATEGORY_NOT_FOUND: '"categoryIds" not found',
  REQUIRED: (name) => `"${name}" is required`,
};

module.exports = { status, messages };