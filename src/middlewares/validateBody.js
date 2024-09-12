import Joi from 'joi';

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional().allow(null),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('personal', 'home').required(),
});

export default contactSchema;
