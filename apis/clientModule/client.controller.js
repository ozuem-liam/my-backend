const clientService = require('./client.service');
const { validationResult } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');
const { query } = require('express-validator');

// const PER_PAGE = 10;
// const DEFAULT_PAGE = 1;

const addClient = async (request, response) => {
  try {
    const errors = validationResult(request);
    const data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, client } = await clientService.addClient(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { client },
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, message, error });
  }
};


const getAllClients = async (request, response) => {
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  // const { per_page = PER_PAGE, page = DEFAULT_PAGE, region = DEFAULT_REGION } = filter;
  const { isSuccess, data, message } = await clientService.getAllClients({});
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const editClientInfo = async (request, response) => {
  const { id } = request.params;
  const errors = validationResult(request);
  const client_data = request.body;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { isSuccess, data, message } = await clientService.editClientInfo(id, client_data);
  if (isSuccess) {
    return sendSuccess({ response, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

const deleteAClient = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, data } = await clientService.deleteAClient(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { addClient, getAllClients, editClientInfo, deleteAClient };