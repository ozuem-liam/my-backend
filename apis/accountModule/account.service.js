const { Account } = require('./account.model');
const messages = require('../../translation/messages.json');
const { jwtTokens } = require('../../utils/jwt-helper');

const loginUser = async ({ email, password }) => {
  let message;
  const account = await Account.findOne({ email });
  if (account) {
    if (await account.isAMatchPassword(password)) {
      // sign a token
      const { _id, first_name, last_name, role } = account;
      const { accessToken } = jwtTokens({ _id, first_name, last_name, role });
      message = messages['ACT-LOGIN-SUCCESS'];
      account.last_login = Date.now();
      account.save();
      return { isSuccess: true, account, message, accessToken };
    } else {
      message = messages['ACT-INVALID-LOGIN'];
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
    let message;
    const exist = await Account.exists({ email });
    if (exist) {
      message = messages['ACT-EMAIL-EXIST'];
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
      const loggedIn = await loginUser({ email, password });
      message = messages['ACT-LOGIN-SUCCESS'];
      if (loggedIn) {
        return { isSuccess: true, account, message, accessToken: loggedIn.accessToken };
      }
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const changePassword = async ({ email, password, new_password }) => {
  let message;
  const account = await Account.findOne({ email });
  if (account) {
    if (await account.isAMatchPassword(password)) {
      account.password = await Account.hashPassword(new_password);
      account.timestamp = { type: Date, default: Date.now };
      await account.save();
      message = messages['ACT-PASSWORD-RESET-SUCCESS'];
      return { isSuccess: true, message };
    } else {
      message = messages['WRONG-PASSWORD-CODE'];
      return { isSuccess: false, message };
    }
  } else {
    message = messages['WRONG-CREDENTIALS'];
    return { isSuccess: false, message };
  }
};

const getAllUsers = async ({ per_page, page, region }) => {
  const offset = (page - 1) * per_page;
  const accounts = await Account.find({ region }, { "first_name": 1, "last_name": 2 }).skip(offset).limit(per_page);
  if (accounts) return { isSuccess: true, data: accounts };
  const message = messages['NO-PSP-OPERATOR-FOUND'];
  return { isSuccess: false, message };
};

module.exports = { loginUser, createAccount, changePassword, getAllUsers };

// .select(
//   'id',
//   'email',
//   'first_name',
//   'last_name',
//   'phone_number',
//   'mda',
//   'organization',
//   'region',
//   'role',
//   'address'
// );
