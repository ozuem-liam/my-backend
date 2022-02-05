const { body } = require('express-validator'),
  messages = require('../../translation/messages.json');

const clientRegistrationSchema = [
  body('name').notEmpty().withMessage({ 'any.required': messages['CLIENT-NAME-REQUIRED'] }),
  body('email')
    .notEmpty()
    .withMessage({ 'any.required': messages['CLIENT-EMAIL-REQUIRED'] })
    .bail()
    .isEmail()
    .withMessage({ 'string.email': messages['CLIENT-EMAIL-INVALID'] }),
  body('phone')
    .notEmpty()
    .withMessage({ 'any.required': messages['CLIENT-PHONE-NUMBER-REQUIRED'] }),
  body('providers')
    .notEmpty()
    .withMessage({ 'any.required': messages['CLIENT-PROVIDERS-REQUIRED'] }),
];

module.exports = {clientRegistrationSchema};
