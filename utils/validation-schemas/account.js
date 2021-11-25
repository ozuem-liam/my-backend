const { body } = require('express-validator'),
  messages = require('../../translation/messages.json');

const registrationSchema = [
  body('email')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-EMAIL-REQUIRED'] })
    .bail()
    .isEmail()
    .withMessage({ 'string.email': messages['ACT-EMAIL-INVALID'] }),
  body('first_name').notEmpty().withMessage({ 'any.required': messages['ACT-FIRSTNAME-REQUIRED'] }),
  body('last_name').notEmpty().withMessage({ 'any.required': messages['ACT-LASTNAME-REQUIRED'] }),
  body('password')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-PASSWORD-REQUIRED'] })
    .bail()
    .isLength({ min: 8 })
    .withMessage({ 'string.pattern.base': messages['ACT-PASSWORD-TOO-SHORT'] }),
  body('confirm_password')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-CONFIRM-PASSWORD-REQUIRED'] })
    .bail()
    .equals(body('password'))
    .withMessage({ 'any.only': messages['ACT-CONFIRM-PASSWORD-MATCH'] }),
];

module.exports = registrationSchema;
