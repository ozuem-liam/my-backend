const mongoose = require('mongoose');

const provider = {
  provider: {
    type: String,
    trim: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
};

const providerDBSchema = mongoose.Schema(provider);
module.exports = { providerDBSchema };