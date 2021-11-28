const accountService = require('../services/accountService'),
  { validationResult } = require('express-validator'),
  { sendSuccess, sendError } = require('./appController');

const loginUser = async (request, response) => {
  const data = request.body;
  const {
    isSuccess,
    message,
    account = {},
    destination = '',
    accessToken,
  } = await accountService.loginUser(data);
  if (isSuccess) {
    if (destination == 'dashboard') {
      response.cookie = accessToken;
    }
    return sendSuccess({
      response,
      message,
      data: { account, destination, accessToken },
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
    const {
      isSuccess,
      message,
      account = {},
      destination = '',
    } = await accountService.createAccount(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { destination, account },
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
  const destination = '/login'
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

module.exports = { loginUser, createAccount, changePassword, logoutUser };
