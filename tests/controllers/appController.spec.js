const httpMocks = require('node-mocks-http');
const faker = require('faker');
const assert = require('assert');
const appController = require('../../helpers/response.format');
const HttpStatusCode = require('../../models/HttpStatusCode');

describe('AppController', () => {
  let response = {};
  beforeEach(() => {
    response = httpMocks.createResponse();
  });
  it('SendSuccess - empty data', async () => {
    const message = 'Registration succesful';
    appController.sendSuccess({ response, message });
    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.SUCCESS);
    assert.strictEqual(responseData.message, message);
    assert.deepStrictEqual(responseData.data, {});
  });

  it('SendSuccess - non empty data', async () => {
    const data = {
      user: { name: faker.name.findName(), email: faker.internet.email() },
    };
    appController.sendSuccess({ response, data });
    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.SUCCESS);
    assert.strictEqual(responseData.message, 'Request successful');
    assert.deepStrictEqual(responseData.data, data);
  });

  it('SendError - empty errors', async () => {
    const message = 'Unable to process your request';
    appController.sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.SERVER_ERROR);
    assert.strictEqual(responseData.message, message);
    assert.deepStrictEqual(responseData.errors, {});
  });

  it('SendError - non-empty errors', async () => {
    const errors = {
      email: faker.random.alpha,
      name: faker.random.alpha(),
    };
    appController.sendError({ response, errors });
    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.strictEqual(responseData.message, 'Invalid requests');
    assert.deepStrictEqual(responseData.errors, errors);
  });
});
