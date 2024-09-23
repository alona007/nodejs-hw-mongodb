import Joi from 'joi';
import { contactList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  contactType: Joi.string()
    .valid(...contactList)
    .required()
    .messages({
      'any.only': 'Contact type must be one of {#valids}',
      'any.required': 'Contact type is required',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
});

export const contactPutSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  contactType: Joi.string()
    .valid(...contactList)
    .required()
    .messages({
      'any.only': 'Contact type must be one of {#valids}',
      'any.required': 'Contact type is required',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  phoneNumber: Joi.string().messages({
    'string.base': 'Phone number must be a string',
  }),
  contactType: Joi.string()
    .valid(...contactList)
    .messages({
      'any.only': 'Contact type must be one of {#valids}',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
});

/*const dataToValidate = {
  name: 'Jo',
  email: 'invalid-email',
  phoneNumber: '',
  contactType: 'unknown',
};

const validationResult = contactAddSchema.validate(dataToValidate, {
  abortEarly: false,
});
if (validationResult.error) {
  console.error(validationResult.error.details);
} else {
  console.log('Data is valid!');
}*/
