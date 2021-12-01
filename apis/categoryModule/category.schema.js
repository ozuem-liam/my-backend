const mongoose = require('mongoose')

const category = {
  category: {
    type: String,
    trim: true,
  },
  category_id:  {
    type: String,
    maxlength: 30,
    default: '',
    index: {
      unique: true,
      partialFilterExpression: { external_id: { $gt: '' } },
    },
    trim: true,
  },
};

const categoryDBSchema = mongoose.Schema(category);
module.exports = { categoryDBSchema };