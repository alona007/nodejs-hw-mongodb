import Joi from 'joi';
import { contactList } from '../constants/contacts.js';

const maxReleaseYear = new Date().getFullYear();

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  contactType: Joi.string()
    .valid(...contactList)
    .required(),
  isFavourite: Joi.boolean(),
  releaseYear: Joi.number().min(1895).max(maxReleaseYear),
});

export const contactPutSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  contactType: Joi.string().valid(...contactList),
  isFavourite: Joi.boolean(),
  releaseYear: Joi.number().min(1895).max(maxReleaseYear),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  contactType: Joi.string().valid(...contactList),
  isFavourite: Joi.boolean(),
  releaseYear: Joi.number().min(1895).max(maxReleaseYear),
});
