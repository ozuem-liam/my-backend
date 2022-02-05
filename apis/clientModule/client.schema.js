const mongoose = require('mongoose');

const client = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    maxlength: 20,
    default: '',
    index: {
      unique: true,
      partialFilterExpression: { phone_number: { $gt: '' } },
    },
    trim: true,
  },
  providers: Array,
  timestamps: {
    immutable: true,
    type: Date,
    default: Date.now,
  },
};

const clientDBSchema = mongoose.Schema(client);
module.exports = { clientDBSchema };
