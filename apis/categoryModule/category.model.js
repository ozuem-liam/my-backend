const mongoose = require('mongoose');
const { categoryDBSchema } = require('./category.schema');

const Category = mongoose.model('Category', categoryDBSchema);
module.exports = { Category };
