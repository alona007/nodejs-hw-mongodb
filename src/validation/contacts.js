import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const ContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(6).max(16).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .optional(),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(10).max(13).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(6).max(16).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .optional(),
}).min(1);
