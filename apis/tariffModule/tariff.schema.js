const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tariff = {
  tariff_charge: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  tariff_charge_code: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
  tariff_image: {
    type: String,
    required: true,
    trim: true,
  },
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
};

const tariffDBSchema = mongoose.Schema(tariff);
module.exports = { tariffDBSchema };