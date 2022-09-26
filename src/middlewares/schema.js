const Joi = require('joi');

const requiredEmpty = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': requiredEmpty,
  }),
  password: Joi.string().required().messages({
    'string.empty': requiredEmpty,
  }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.empty': requiredEmpty,
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': requiredEmpty,
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': requiredEmpty,
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
  }),
});

module.exports = {
  loginSchema,
  userSchema,
  categorySchema,
};