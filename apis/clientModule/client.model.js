const mongoose = require('mongoose');
const { clientDBSchema } = require('./client.schema');


const Client = mongoose.model('Client', clientDBSchema);
module.exports = { Client };
