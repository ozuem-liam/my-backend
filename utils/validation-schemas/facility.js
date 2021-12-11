const { body } = require('express-validator');
const messages = require('../../translation/messages.json');

const FacilityRegistrationSchema = [
    body('facility_email_1')
      .isEmail()
      .withMessage({ 'string.email': messages['FACILITY-EMAIL-INVALID'] }),
    body('facility_email_2')
      .isEmail()
      .withMessage({ 'string.email': messages['FACILITY-EMAIL-INVALID'] }),
    body('facility_name').notEmpty().withMessage({ 'any.required': messages['FACILITY-NAME-REQUIRED'] }),
    body('facility_phone_number_1'),
    body('facility_phone_number_2'),
    body('location'),
    body('address'),
    body('charge_per_trip'),
    body('number_of_trips'),
    body('number_of_bins'),
    body('service_charge'),
    body('status')
      .isIn(['Active', 'Completed'])
      .withMessage({ 'any.required': messages['FACILITY-STATUS-DO-NOT-EXIST'] }),
    body('billing_type')
      .isIn(['PER TRIP ', 'MONTHLY'])
      .withMessage({ 'any.required': messages['FACILITY-STATUS-DO-NOT-EXIST'] }),
    body('servicing_psp'),
  ];
  

  module.exports = { FacilityRegistrationSchema }