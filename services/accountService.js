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

const createAccount = async ({
  email,
  password,
  first_name,
  last_name,
  mda,
  phone_number,
  organization,
  region,
  role,
  address,
}) => {
  try {
    exist = await Account.exists({ email });
    if (exist) {
      const message = messages['ACT-EMAIL-EXIST'];
      return { isSuccess: false, message };
    }
    const hashPassword = await Account.hashPassword(password);
    const account = await Account.create({
      email,
      first_name,
      last_name,
      password: hashPassword,
      mda,
      phone_number,
      organization,
      region,
      role,
      address,
    });
    if (account) {
      await loginUser({ email, password });
      let destination = 'dashboard',
        message = messages['ACT-LOGIN-SUCCESS'];
      return {
        isSuccess: true,
        message,
        destination,
        account: formatAccountResponse(account),
      };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const formatAccountResponse = (account) => {
  const {
    id,
    email,
    first_name,
    last_name,
    phone_number,
    mda,
    organization,
    region,
    role,
    address,
  } = account;

  return {
    id,
    email,
    first_name,
    last_name,
    phone_number,
    mda,
    organization,
    region,
    role,
    address,
  };
};

const changePassword = async ({ email, password, new_password }) => {
  const account = await Account.findOne({ email });
  if (account) {
    if (await account.isAMatchPassword(password)) {
      account.password = await Account.hashPassword(new_password);
      account.timestamp = { type: Date, default: Date.now };
      await account.save();
      const message = messages['ACT-PASSWORD-RESET-SUCCESS'];
      return { isSuccess: true, message };
    } else {
      return { isSuccess: false, message: messages['WRONG-PASSWORD-CODE'] };
    }
  } else {
    return { isSuccess: false, message: messages['WRONG-CREDENTIALS'] };
  }
};

module.exports = { loginUser, createAccount, changePassword };
