const mongoose = require('mongoose');

const psp_operator = {
  psp_operator_name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  ceo_name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  psp_operator_phone_number: {
    type: String,
    maxlength: 20,
    default: '',
    index: {
      unique: true,
      partialFilterExpression: { phone_number: { $gt: '' } },
    },
    trim: true,
  },
  psp_operator_email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  region: {
    type: [String],
    enum: ['general', 'west', 'central'],
    default: 'general',
  },
  address: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  slots: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  account_number: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  bank_name: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  bank_branch_code: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
};

const pspOperatorDBSchema = mongoose.Schema(psp_operator);
module.exports = { pspOperatorDBSchema };
