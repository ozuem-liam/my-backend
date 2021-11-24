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
    minlength: 8,
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
  }
};

const accountDBSchema = mongoose.Schema(account);
module.exports = { accountDBSchema };