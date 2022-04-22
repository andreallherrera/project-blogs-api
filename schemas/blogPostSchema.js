const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"title" is required',
  }),
  content: Joi.string().required().messages({
    'string.empty': '"content" is required',
  }),
  categoryIds: Joi.array().required().messages({
    'array.empty': '"categoryIds" is required',
  }),
});

module.exports = schema;