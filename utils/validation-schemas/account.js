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
    .withMessage({ 'string.pattern.base': messages['ACT-PASSWORD-TOO-SHORT'] })
    .custom((value,{req, loc, path}) => {
      if (value !== req.body.confirm_password) {
          // trow error if passwords do not match
          throw new Error({ 'any.only': messages['ACT-CONFIRM-PASSWORD-MATCH'] });
      } else {
          return value;
      }
  })
];

module.exports = registrationSchema;
