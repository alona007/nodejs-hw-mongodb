import { Schema, model } from 'mongoose';

import { emailRegexp } from '../../constants/user.js';

import { handleSaveError } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);
export default UserCollection;
