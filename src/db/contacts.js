import { Schema, model } from 'mongoose';

import { createdAtRegexp } from '../constants/contacts.js';

import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: ['personal', 'home'],
      required: true,
    },
    createdAt: {
      type: String,
      match: createdAtRegexp,
      required: true,
    },
    // updatedAt:{
    //     type: String,
    //     required: true,
    // }
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

const ContactCollection = model('contact', contactSchema);

export const sortFields = [
  'title',
  'director',
  'genre',
  'favorite',
  'releaseYear',
  'createdAt',
  'updatedAt',
];

// const ContactCollection = model("contact", contactSchema);

export default ContactCollection;
