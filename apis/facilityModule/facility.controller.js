const facilityService = require('./facility.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_ID = 1;
const DEFAULT_STATUS = "Approved";
const DEFAULT_BILLING_TYPE = "PER_TRIP";

const getAllFacilityByBillingType = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE, psp_id = DEFAULT_ID, billing_type = DEFAULT_BILLING_TYPE } = filter;
  const { isSuccess, data, message } = await facilityService.getAllFacilityByBillingType({
    per_page,
    page,
    psp_id,
    billing_type,
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const getAllFacilityByStatus = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE, psp_id = DEFAULT_ID, status = DEFAULT_STATUS } = filter;
  const { isSuccess, data, message } = await facilityService.getAllFacilityByStatus({
    per_page,
    page,
    psp_id,
    status
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const getFacility = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE, psp_id = DEFAULT_ID } = filter;
  const { isSuccess, data, message } = await facilityService.getFacility({
    per_page,
    page,
    psp_id
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createFacility = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { psp_id, facility_name, address, service_charge, billing_type } = request.body;
  const { isSuccess, message, data } = await facilityService.createFacility({
    psp_id,
    facility_name,
    address,
    service_charge,
    billing_type,
  });
  if (isSuccess) {
    return sendSuccess({
      response,
      message,
      data,
    });
  } else {
    return sendError({ response, message });
  }
};

const updateFacility = async (request, response) => {
  const { id } = request.params;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { facility_name, address, service_charge, billing_type } = request.body;
  const { isSuccess, data, message } = await facilityService.updateFacility({
    id,
    facility_name,
    address,
    service_charge,
    billing_type,
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createEnumeratedFacility = async (request, response) => {
  // const { id } = request.params;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const {
    id,
    facility_name,
    facility_email_1,
    facility_email_2,
    facility_phone_number_1,
    facility_phone_number_2,
    location,
    address,
    charge_per_trip,
    number_of_trips,
    number_of_bins,
    service_charge,
    status,
    category,
    servicing_psp,
    facility_front_image,
    facility_waste_image,
    front_image_cloudinary_id,
    waste_image_cloudinary_id,
  } = request.body;
  const { isSuccess, data, message } = await facilityService.createEnumeratedFacility({
    id,
    facility_name,
    facility_email_1,
    facility_email_2,
    facility_phone_number_1,
    facility_phone_number_2,
    location,
    address,
    charge_per_trip,
    number_of_trips,
    number_of_bins,
    service_charge,
    status,
    category,
    servicing_psp,
    facility_front_image,
    facility_waste_image,
    front_image_cloudinary_id,
    waste_image_cloudinary_id,
  });
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const deleteFacility = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, facility } = await facilityService.deleteFacility(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data: { facility } });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = {
  createFacility,
  deleteFacility,
  createEnumeratedFacility,
  getFacility,
  updateFacility,
  getAllFacilityByStatus,
  getAllFacilityByBillingType
};
