const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoice = {
  month: {
    type: [String],
    enum: [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ],
    default: 'JANUARY',
  },
  year: {
    type: [String],
    required: true,
  },
  type: {
    type: [String],
    enum: ['Psp', 'Facility'],
  },
  invoice_id: {
    type: Schema.Types.ObjectId,
    ref: 'Facility',
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
};

const invoiceDBSchema = mongoose.Schema(invoice);
module.exports = { invoiceDBSchema };
