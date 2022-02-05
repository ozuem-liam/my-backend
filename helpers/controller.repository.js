const ClientController = require('../apis/clientModule/client.controller');
const ProviderController = require('../apis/providerModule/provider.controller');

const controllers = {
  client: ClientController,
  provider: ProviderController,
};

module.exports = controllers;
