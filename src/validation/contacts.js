import Joi from 'joi';
import { contactList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'number must exist',
  }),
  contactType: Joi.string()
    .valid(...contactList)
    .required(),
  isFavourite: Joi.boolean(),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  contactType: Joi.string().valid(...contactList),
  isFavourite: Joi.boolean(),
});
