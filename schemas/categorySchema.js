const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
  }),
});

module.exports = schema;