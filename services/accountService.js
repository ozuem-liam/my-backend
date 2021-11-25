const { Account } = require('../database/models/Account'),
  messages = require('../translation/messages.json');
const { jwtTokens } = require('../utils/jwt-helper');

const loginUser = async ({ email, password }) => {
  const account = await Account.findOne({ email });
  if (account) {
    if (await account.isAMatchPassword(password)) {
      // sign a token
      const { _id, email, password } = account;
      const { accessToken } = jwtTokens({ _id, email, password });
      let destination = 'dashboard',
        message = messages['ACT-LOGIN-SUCCESS'],
        isSuccess = true;
      account.last_login = Date.now();
      account.save();
      return { isSuccess, account, destination, message, accessToken };
    } else {
      let message = messages['ACT-INVALID-LOGIN'];
      return { isSuccess: false, message };
    }
  }
  message = messages['USER-NOT-FOUND'];
  return { isSuccess: false, message };
};

const createAccount = async ({ email, password, first_name, last_name }) => {
  try {
    const exist = await Account.exists({ email });
    if (exist) {
      const message = messages['ACT-EMAIL-EXIST'];
      return { isSuccess: false, message };
    } else {
      const hashPassword = await Account.hashPassword(password);
      const account = await new Account({
        email,
        first_name,
        last_name,
        password: hashPassword,
      }).save();
      const message = messages['ACT-REGISTER-SUCCESS'];
      return {
        isSuccess: true,
        message,
        destination: 'dashboard',
        account: formatAccountResponse(account),
      };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const formatAccountResponse = (account) => {
  const { id, email, first_name, last_name } = account;

  return {
    id,
    email,
    first_name,
    last_name,
  };
};

module.exports = { loginUser, createAccount };
