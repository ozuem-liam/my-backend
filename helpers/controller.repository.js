const AccountController = require('../apis/accountModule/account.controller');
const PspOperatorController = require('../apis/pspOperatorModule/psp.operator.controller');
const TariffController = require('../apis/tariffModule/tariff.controller');
const FacilityController = require('../apis/facilityModule/facility.controller');
const CategoryController = require('../apis/categoryModule/category.controller');
const InvoiceController = require('../apis/invoiceModule/invoice.controller');

const controllers = {
  account: AccountController,
  psp: PspOperatorController,
  tariff: TariffController,
  facility: FacilityController,
  category: CategoryController,
  invoice: InvoiceController,
};

module.exports = controllers;
