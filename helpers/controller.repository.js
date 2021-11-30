const AccountController = require('../apis/accountModule/account.controller');
const PspOperatorController = require('../apis/pspOperatorModule/psp.operator.controller');

const controllers = {
  account: AccountController,
  psp: PspOperatorController,
};

module.exports = controllers;
