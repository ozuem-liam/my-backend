const { body } = require('express-validator');
const messages = require('../../translation/messages.json');

const CreateTariffSchema = [
    body('tariff_charge').notEmpty().withMessage({ 'any.required': messages['TARIFF-CHARGE-REQUIRED'] }),
    body('tariff_charge_code')
    .notEmpty()
    .withMessage({ 'any.required': messages['TARIFF-CHARGE-CODE-REQUIRED'] }),
    body('duration')
    .notEmpty()
    .withMessage({ 'any.required': messages['TARIFF-DURATION-REQUIRED'] }),
    body('amount').notEmpty().withMessage({ 'any.required': messages['TARIFF-AMOUNT-REQUIRED'] }),
  ];
  

  module.exports = { CreateTariffSchema }