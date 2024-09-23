import { Schema, model } from 'mongoose';
import { contactList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateOptions } from '../models/hooks.js';

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
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactList,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);
contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

const ContactsCollection = model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updateAt',
];
export default ContactsCollection;
