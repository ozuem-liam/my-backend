const tariffService = require('./tariff.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const cloudinary = require('../../helpers/cloudinary.service');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const getTariff = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE } = filter;
  const { isSuccess, data, message } = await tariffService.getTariff({
    per_page,
    page,
  });
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createTariff = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }

    const file = await cloudinary.uploader.upload(request.file.path);

    const { tariff_charge, tariff_charge_code, duration, amount } = request.body;
    const { isSuccess, message, data } = await tariffService.createTariff({
      tariff_charge,
      tariff_charge_code,
      duration,
      amount,
      tariff_image: file.secure_url,
      cloudinary_id: file.public_id,
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
  } catch (error) {
    return sendError({ response, error });
  }
};

const updateTariff = async (request, response) => {
  const { id } = request.params;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { tariff_charge, tariff_charge_code, duration, amount } = request.body;
  const file = await cloudinary.uploader.upload(request.file.path);
  const { isSuccess, data, message } = await tariffService.updateTariff({
    id,
    tariff_charge,
    tariff_charge_code,
    duration,
    amount,
    tariff_image: file.secure_url,
    cloudinary_id: file.public_id,
  });
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const deleteTariff = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, tariff } = await tariffService.deleteTariff(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data: { tariff } });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { createTariff, deleteTariff, getTariff, updateTariff };
