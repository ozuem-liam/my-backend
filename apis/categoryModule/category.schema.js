const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = {
  category: {
    type: String,
    trim: true,
  },
  category_id:  {
    type: Schema.Types.ObjectId,
    ref: 'Facility',
  },
};

const categoryDBSchema = mongoose.Schema(category);
module.exports = { categoryDBSchema };