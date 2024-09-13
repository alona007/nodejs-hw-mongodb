import Joi from 'joi';

import { contactList, createdAtRegexp } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'number must be exist',
  }),
  contactType: Joi.string()
    .valid(...contactList)
    .required(),
  isFavourite: Joi.boolean(),
  createdAt: Joi.string().pattern(createdAtRegexp).required(),
});

export const contactPatchSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  genre: Joi.string().valid(...contactList),
  favorite: Joi.boolean(),
  releaseYear: Joi.string(),
});
