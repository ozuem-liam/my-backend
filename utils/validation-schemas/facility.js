const { body } = require('express-validator');
const messages = require('../../translation/messages.json');

const FacilityUpdateSchema = [
  body('facility_email_1')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-EMAIL-REQUIRED'] }),
  body('facility_email_2')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-EMAIL-REQUIRED'] }),
  body('facility_name')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-NAME-REQUIRED'] }),
  body('facility_phone_number_1')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-PHONE-NUMBER-REQUIRED'] }),
  body('facility_phone_number_2')
    .notEmpty()
    .withMessage({ 'any.required': messages['ACT-PHONE-NUMBER-REQUIRED'] }),
  body('location')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-LOCATION-REQUIRED'] }),
  body('address').notEmpty().withMessage({ 'any.required': messages['FACILITY-ADDRESS-REQUIRED'] }),
  body('category')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-CATEGORY-REQUIRED'] }),
  body('charge_per_trip')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-CHARGE-PER-TRIP-REQUIRED'] }),
  body('number_of_trips')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-NUMBER-OF-TRIPS-REQUIRED'] }),
  body('number_of_bins')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-NUMBER-OF-BINS-REQUIRED'] }),
  body('service_charge')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-SERVICE-CHARGE-REQUIRED'] }),
  body('status')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-STATUS-REQUIRED'] })
    .isIn(['Approved', 'Completed', 'Incomplete'])
    .withMessage({ 'any.required': messages['FACILITY-STATUS-DO-NOT-EXIST'] }),
  body('psp_id')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-SERVICING-PSP-REQUIRED'] }),
];

const FacilityRegistrationSchema = [
  body('facility_name')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-NAME-REQUIRED'] }),
  body('address').notEmpty().withMessage({ 'any.required': messages['FACILITY-ADDRESS-REQUIRED'] }),
  body('service_charge')
    .notEmpty()
    .withMessage({ 'any.required': messages['FACILITY-SERVICE-CHARGE-REQUIRED'] }),
  body('billing_type')
    .isIn(['PER_TRIP', 'MONTHLY'])
    .withMessage({ 'any.required': messages['FACILITY-BILLING-TYPE-DO-NOT-EXIST'] }),
];

module.exports = { FacilityRegistrationSchema, FacilityUpdateSchema };
