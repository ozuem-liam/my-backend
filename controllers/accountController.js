const accountService = require('../services/accountService'),
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
    // response.header("authorization", accessToken);
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
  const data = request.body;
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
  }
  return sendError({ response, message });
};

const logoutUser = async (request, response) => {};

const resetPassword = async (request, response) => {};

module.exports = { loginUser, createAccount, resetPassword, logoutUser };
