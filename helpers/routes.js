const clientRoutes = require('../apis/clientModule/client.route');
const providerRoutes = require('../apis/providerModule/provider.route');

module.exports = function (app) {
  app.use('/client', clientRoutes);
  app.use('/provider', providerRoutes);
};
