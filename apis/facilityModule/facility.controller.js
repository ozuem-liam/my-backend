const facilityService = require('./facility.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');
const cloudinary = require('../../helpers/cloudinary.service');
const fs = require('fs');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const getFacility = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE } = filter;
  const { isSuccess, data, message } = await facilityService.getFacility({
    per_page,
    page,
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
  const uploader = async (path) => {
    return await cloudinary.uploader.upload(path);
  };
  const urls = [];
  const files = request.files;
  for (const file of files) {
    const { path } = file;

    const newPath = await uploader(path);

    urls.push(newPath);
    fs.unlinkSync(path);
  }
  const {
    psp_id,
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
    external_id,
    servicing_psp,
  } = request.body;
  const { isSuccess, message, data } = await facilityService.createFacility({
    psp_id,
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
    external_id,
    servicing_psp,
    facility_front_image: urls[0].secure_url,
    facility_waste_image: urls[1].secure_url,
    front_image_cloudinary_id: urls[0].public_id,
    waste_image_cloudinary_id: urls[1].public_id,
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
  const uploader = async (path) => {
    return await cloudinary.uploader.upload(path);
  };
  const urls = [];
  const files = request.files;
  for (const file of files) {
    const { path } = file;

    const newPath = await uploader(path);

    urls.push(newPath);
    fs.unlinkSync(path);
  }
  const {
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
    external_id,
    servicing_psp,
  } = request.body;
  const { isSuccess, data, message } = await facilityService.updateFacility({
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
    external_id,
    servicing_psp,
    facility_front_image: urls[0].secure_url,
    facility_waste_image: urls[1].secure_url,
    front_image_cloudinary_id: urls[0].public_id,
    waste_image_cloudinary_id: urls[1].public_id,
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
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

module.exports = { createFacility, deleteFacility, getFacility, updateFacility };
