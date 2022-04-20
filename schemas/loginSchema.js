const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': '"email" is not allowed to be empty',
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().length(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
    'string.empty': '"password" is not allowed to be empty',
  }),
});

module.exports = schema;