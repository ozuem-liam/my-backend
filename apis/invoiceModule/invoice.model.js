const mongoose = require('mongoose');
const { invoiceDBSchema } = require('./invoice.schema');

const Invoice = mongoose.model('Invoice', invoiceDBSchema);
module.exports = { Invoice };