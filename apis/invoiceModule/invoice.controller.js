const invoiceService = require('./invoice.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { query } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const getInvoice = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE } = filter;
  const { isSuccess, data, message } = await invoiceService.getInvoice({
    per_page,
    page,
  });
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const createInvoice = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }

    const { facility_id, month, year } = request.body;
    const { isSuccess, message, data } = await invoiceService.createInvoice({
      facility_id,
      month,
      year,
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

const updateInvoice = async (request, response) => {
  const { id } = request.params;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { month, year } = request.body;
  const { isSuccess, data, message } = await invoiceService.updateInvoice({
    id,
    month, 
    year,
  });
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const deleteInvoice = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, tariff } = await invoiceService.deleteInvoice(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data: { tariff } });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { createInvoice, deleteInvoice, getInvoice, updateInvoice };
