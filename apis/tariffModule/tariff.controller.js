const tariffService = require('./tariff.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_ID = 1;
const DEFAULT_TIMESTAMP = '2021-12-20T12:01:39.356Z';

const getTariff = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const {
    per_page = PER_PAGE,
    page = DEFAULT_PAGE,
    account_id = DEFAULT_ID,
    timestamp = { $lt: new Date(), $gt: new Date(DEFAULT_TIMESTAMP) },
  } = filter;
  const { isSuccess, data, message } = await tariffService.getTariff({
    per_page,
    page,
    account_id,
    timestamp,
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

    const {
      account_id,
      tariff_charge,
      tariff_charge_code,
      duration,
      amount,
      tariff_image,
      cloudinary_id,
    } = request.body;
    const { isSuccess, message, data } = await tariffService.createTariff({
      account_id,
      tariff_charge,
      tariff_charge_code,
      duration,
      amount,
      tariff_image,
      cloudinary_id,
    });
    if (isSuccess) {
      return sendSuccess({
        response,
        data,
        message,
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
  const { tariff_charge, tariff_charge_code, duration, amount, tariff_image, cloudinary_id } =
    request.body;

  const { isSuccess, data, message } = await tariffService.updateTariff({
    id,
    tariff_charge,
    tariff_charge_code,
    duration,
    amount,
    tariff_image,
    cloudinary_id,
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
