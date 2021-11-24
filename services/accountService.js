const { Account } = require('../database/models/Account'),
  messages = require('../translation/messages.json');


  const loginUser = async ({ email, password }) => {

  }


  const createAccount = async ({
    email,
    password,
    first_name,
    last_name
  }) => {

  }

module.exports = { loginUser, createAccount };