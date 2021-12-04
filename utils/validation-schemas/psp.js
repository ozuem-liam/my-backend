const { body, query } = require('express-validator');
const messages = require('../../translation/messages.json');

const PspRegistrationSchema = [
    body('psp_operator_email')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-EMAIL-REQUIRED'] })
      .bail()
      .isEmail()
      .withMessage({ 'string.email': messages['PSP-OPERATOR-EMAIL-INVALID'] }),
    body('psp_operator_name').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-NAME-REQUIRED'] }),
    body('ceo_name').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-CEO-NAME-REQUIRED'] }),
    body('location').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-LOCATION-REQUIRED'] }),
    body('psp_operator_phone_number')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-PHONE-NUMBER-REQUIRED'] }),
    body('district')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-DISTRICT-REQUIRED'] }),
    body('slots')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-SLOTS-REQUIRED'] }),
    body('account_number')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-ACT-NUMBER-REQUIRED'] }),
    body('bank_name')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-BANK-NAME-REQUIRED'] }),
    body('bank_branch_code')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-BANK-BRANCH-CODE-REQUIRED'] }),
    body('region')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-REGION-REQUIRED'] })
      .isIn(['general', 'west', 'central'])
      .withMessage({ 'any.required': messages['PSP-OPERATOR-REGION-DO-NOT-EXIST'] }),
    body('address').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-ADDRESS-REQUIRED'] }),
  ];
  

  const PspUpdateSchema = [
    body('psp_operator_email')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-EMAIL-REQUIRED'] })
      .bail()
      .isEmail()
      .withMessage({ 'string.email': messages['PSP-OPERATOR-EMAIL-INVALID'] }),
    body('psp_operator_name').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-NAME-REQUIRED'] }),
    body('ceo_name').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-CEO-NAME-REQUIRED'] }),
    body('location').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-LOCATION-REQUIRED'] }),
    body('psp_operator_phone_number')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-PHONE-NUMBER-REQUIRED'] }),
    body('district')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-DISTRICT-REQUIRED'] }),
    body('slots')
      .notEmpty()
      .withMessage({ 'any.required': messages['PSP-OPERATOR-SLOTS-REQUIRED'] }),
    body('address').notEmpty().withMessage({ 'any.required': messages['PSP-OPERATOR-ADDRESS-REQUIRED'] }),
  ];

  module.exports = { PspRegistrationSchema, PspUpdateSchema }