const mongoose = require('mongoose');
const { providerDBSchema } = require('./provider.schema');

const Provider = mongoose.model('Provider', providerDBSchema);
module.exports = { Provider };
