import Joi from 'joi';
import { emailRegexp } from '../constants/Users.js';

export const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const newPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
