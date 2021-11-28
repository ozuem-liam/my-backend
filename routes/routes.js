const accountRoutes = require('./account');

module.exports = function (app) {
  app.use('/account', accountRoutes);
};
