const mongoose = require('mongoose');
const { facilityDBSchema } = require('./facility.schema');

const Facility = mongoose.model('Facility', facilityDBSchema);
module.exports = { Facility };