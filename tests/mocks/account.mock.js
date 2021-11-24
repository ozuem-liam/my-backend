const faker = require('faker'),
  messages = require('../../translation/messages.json');

const password = 'RandomP330hs';

const registrationMockRequest = {
    password,
    id: 'dummyid',
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    confirm_password: password
  },
  loginMockRequest = {
    email: faker.internet.email(),
    password: password,
  },
  createAccountResponse = {
    account: registrationMockRequest,
    isSuccess: true,
    destination: 'dashboard',
    message: messages['ACT-LOGIN-SUCCESS'],
  };
module.exports = { loginMockRequest, registrationMockRequest, createAccountResponse };
