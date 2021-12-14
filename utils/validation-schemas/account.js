const { body } = require('express-validator'),
  messages = require('../../translation/messages.json');

const changePasswordSchema = [
  body('email')
  .notEmpty()
  .withMessage({ 'any.required': messages['ACT-EMAIL-REQUIRED'] })
  .bail()
  .isEmail()
  .withMessage({ 'string.email': messages['ACT-EMAIL-INVALID'] }),
  body('password')
  .notEmpty()
  .withMessage({ 'any.required': messages['ACT-PASSWORD-REQUIRED'] })
  .bail()
  .isLength({ min: 8 })
  .withMessage({ 'string.pattern.base': messages['ACT-PASSWORD-TOO-SHORT'] }),
  body('new_password')
  .notEmpty()
  .withMessage({ 'any.required': messages['ACT-PASSWORD-REQUIRED'] })
  .bail()
  .isLength({ min: 8 })
  .withMessage({ 'string.pattern.base': messages['ACT-PASSWORD-TOO-SHORT'] })
  .custom(async (value, { req, loc, path }) => {
    if (value !== req.body.confirm_new_password) {
      // trow error if passwords do not match
      throw new Error({ 'any.only': messages['ACT-CONFIRM-PASSWORD-MATCH'] });
    } else {
      return value;
    }
  }),
]
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
    .isLength({ min: 8 })
    .withMessage({ 'string.pattern.base': messages['ACT-PASSWORD-TOO-SHORT'] })
    .custom(async (value, { req, loc, path }) => {
      if (value !== req.body.confirm_password) {
        // trow error if passwords do not match
        throw new Error({ 'any.only': messages['ACT-CONFIRM-PASSWORD-MATCH'] });
      } else {
        return value;
      }
    }),
  body('mda').notEmpty().withMessage({ 'any.required': messages['ACT-MDA-REQUIRED'] }),
  body('phone_number')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-PHONE-NUMBER-REQUIRED'] }),
  body('organization')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-ORGANIZATION-REQUIRED'] }),
  body('region')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-REGION-REQUIRED'] })
    .isIn(['general', 'west', 'central'])
    .withMessage({ 'any.required': messages['ACT-REGION-DO-NOT-EXIST'] }),
  body('role')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-ROLE-REQUIRED'] })
    .isIn([
      'super_admin',
      'registration_admin',
      'reception',
      'accountant',
      'verification/approval',
      'MDA',
    ]),
  body('address').notEmpty().withMessage({ 'any.required': messages['ACT-ADDRESS-REQUIRED'] }),
];

module.exports = {registrationSchema, changePasswordSchema};
