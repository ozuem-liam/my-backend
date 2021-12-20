const accountService = require('./account.service');
const { validationResult } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');
const { query } = require('express-validator');

const PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_REGION = 'general';

const loginUser = async (request, response) => {
  const data = request.body;
  const { isSuccess, message, account = {}, accessToken } = await accountService.loginUser(data);
  if (isSuccess) {
    response.cookie = accessToken;
    return sendSuccess({
      response,
      message,
      data: { account, accessToken },
    });
  }
  return sendError({ response, message });
};

const createAccount = async (request, response) => {
  try {
    const errors = validationResult(request);
    const data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, account, accessToken } = await accountService.createAccount(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { account, accessToken },
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, message, error });
  }
};

const logoutUser = async (request, response) => {
  //We might update a record on db
  //const { id } = request.body.currentUser;
  const destination = '/login';
  return sendSuccess({ response, message: 'Successfully logged out', destination });
};

const changePassword = async (request, response) => {
  const errors = validationResult(request);
  const data = request.body;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { isSuccess, message } = await accountService.changePassword(data);
  if (isSuccess) {
    return sendSuccess({ response, message });
  }
  return sendError({ response, message });
};


const getAllUsers = async (request, response) => {
  query('per_page', '"per_page" must be a int, not empty').notEmpty().isInt();
  query('page', '"page" must be a int, not empty').notEmpty().isInt();
  query('region', '"region" must be a string, not empty').notEmpty().toString();
  const errors = validationResult(request);
  const filter = request.query;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { per_page = PER_PAGE, page = DEFAULT_PAGE, region = DEFAULT_REGION } = filter;
  const { isSuccess, data, message } = await accountService.getAllUsers({
    per_page,
    page,
    region,
  });
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { loginUser, createAccount, changePassword, logoutUser, getAllUsers };
