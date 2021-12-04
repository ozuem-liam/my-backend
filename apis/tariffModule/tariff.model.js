const mongoose = require('mongoose');
const { tariffDBSchema } = require('./tariff.schema');

const Tariff = mongoose.model('Tariff', tariffDBSchema);
module.exports = { Tariff };
