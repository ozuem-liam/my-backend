const mongoose = require('mongoose');

const account = {
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  mda: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  phone_number: {
    type: String,
    maxlength: 20,
    default: '',
    index: {
      unique: true,
      partialFilterExpression: { phone_number: { $gt: '' } },
    },
    trim: true,
  },
  organization: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  regions: {
    type: [String],
    enum: ["general", "west", "central"],
    default: 'general',
  },
  role: {
    type: [String],
    enum: [
      'super_admin',
      'admin',
      'user',
      'registration_admin',
      'reception',
      'accountant',
      'verification/approval',
      'MDA'
    ],
    default: 'user',
  },
  address: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  timestamps : { 
    immutable: true,
    type : Date, 
    default: Date.now 
  }
};

const accountDBSchema = mongoose.Schema(account);
module.exports = { accountDBSchema };