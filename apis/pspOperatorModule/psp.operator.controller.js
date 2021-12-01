const pspService = require('./psp.operator.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_REGION = 'general';

const getPspOperators = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  query('region', '"region" must be a string, not empty').notEmpty().toString();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE, region = DEFAULT_REGION } = filter;
  const { isSuccess, data, message } = await pspService.getPspOperators({
    per_page,
    page,
    region,
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createPspOperator = async (request, response) => {
  try {
    const errors = validationResult(request);
    const data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, pspOperator } = await pspService.createPspOperator(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { pspOperator },
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, message, error });
  }
};

const updatePspOperator = async (request, response) => {
    const { id } = request.params;
    const errors = validationResult(request);
    const psp_data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, data, message } = await pspService.updatePspOperator(id, psp_data);
    if (isSuccess) {
      return sendSuccess({ response, data });
    }
    return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
  };

const deletePspOperator = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, psp } = await pspService.deletePspOperator(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data: { psp } });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { createPspOperator, deletePspOperator, getPspOperators, updatePspOperator };
