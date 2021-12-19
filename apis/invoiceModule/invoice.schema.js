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
  details: {
    invoice_ref: {
      type: String,
    },
    status: {
      type: [String],
      enum: ['Not Paid', 'Partially Paid', 'Paid'],
    },
    type: {
      type: [String],
      enum: ['Psp', 'Facility'],
    },
    invoice_id: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
    },
    amount: {
      type: Number,
    }
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
};

const invoiceDBSchema = mongoose.Schema(invoice);
module.exports = { invoiceDBSchema };
