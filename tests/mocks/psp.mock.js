const faker = require('faker');
const messages = require('../../translation/messages.json');


const createPspMockRequest = {
    id: 'dummyid',
    psp_operator_email: faker.internet.email(),
    psp_operator_name: faker.name.firstName(),
    ceo_name: faker.name.firstName(),
    location: faker.company.companyName(),
    psp_operator_phone_number: faker.phone.phoneNumber(),
    address: faker.company.companyName(),
    district: faker.company.companyName(),
    slots: faker.company.companyName(),
    bank_name: faker.company.companyName(),
    bank_branch_code: faker.company.companyName(),
    region: faker.address.city(),
    account_number: faker.address.city(),
    address: faker.address.direction(),
  }

module.exports = { createPspMockRequest };
