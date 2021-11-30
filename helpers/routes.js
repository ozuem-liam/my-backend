const accountRoutes = require('../apis/accountModule/account.route');
const pspOperatorRoutes = require('../apis/pspOperatorModule/psp.operator.route');

module.exports = function (app) {
  app.use('/account', accountRoutes);
  app.use('/psp', pspOperatorRoutes);
};
