const providerService = require('./provider.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { sendSuccess, sendError } = require('../../helpers/response.format');


const getProviders = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, data, message } = await providerService.getProviders(id);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const getSortedProviders = async (request, response) => {
  const array = JSON.parse(request.query.array);
  const { isSuccess, data, message } = await providerService.getSortedProviders(array);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const addAProvider = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }

    const { provider } = request.body;
    const { isSuccess, message, data } = await providerService.addAProvider({
      provider,
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

const deleteAProvider = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, data } = await providerService.deleteAProvider(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { addAProvider, deleteAProvider, getProviders, getSortedProviders };
