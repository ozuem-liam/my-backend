const mongoose = require('mongoose'),
  { pspOperatorDBSchema } = require('../schemas/psp_operator');

const Psp = mongoose.model('Psp', pspOperatorDBSchema);
module.exports = { Psp };
