const tariffService = require('./tariff.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
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
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createTariff = async (request, response) => {
  try {
    const errors = validationResult(request);
    const data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, tariff } = await tariffService.createTariff(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { tariff },
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, message, error });
  }
};

const updateTariff = async (request, response) => {
    const { id } = request.params;
    const errors = validationResult(request);
    const tariff_data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, data, message } = await tariffService.updateTariff(id, tariff_data);
    if (isSuccess) {
      return sendSuccess({ response, data });
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
