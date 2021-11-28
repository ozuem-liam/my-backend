const faker = require('faker'),
  messages = require('../../translation/messages.json');

const password = 'RandomP330hs';

const registrationMockRequest = {
    password,
    id: 'dummyid',
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    confirm_password: password,
    mda: faker.company.companyName(),
    phone_number: faker.phone.phoneNumber(),
    organization: faker.company.companyName(),
    region: faker.address.city(),
    role: 'super_admin',
    address: faker.address.direction(),
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
