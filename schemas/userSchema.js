const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': '"email" is required',
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().length(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
    'string.empty': '"password" is required',
  }),
  image: Joi.string().required(),
});

module.exports = schema;