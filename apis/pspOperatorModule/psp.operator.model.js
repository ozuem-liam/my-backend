const mongoose = require('mongoose');
const { pspOperatorDBSchema } = require('./psp.operator.schema');

const Psp = mongoose.model('Psp', pspOperatorDBSchema);
module.exports = { Psp };
