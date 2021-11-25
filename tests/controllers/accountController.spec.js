const sinon = require('sinon'),
  assert = require('assert'),
  rewire = require('rewire'),
  httpMocks = require('node-mocks-http'),
  { resetStubAndSpys } = require('../testHelper');

const accountController = require('../../controllers/accountController'),
  accountService = require('../../services/accountService'),
  accountMock = require('../mocks/account.mock'),
  messages = require('../../translation/messages.json'),
  HttpStatusCode = require('../../models/HttpStatusCode');

describe('AccountController', async () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it('Create Account - Invalid request', () => {
    const request = { body: {} };
    const response = httpMocks.createResponse();
    accountController.createAccount(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.deepStrictEqual(responseData.message, 'Invalid requests');
    assert.ok(Object.keys(responseData.errors).length > 3);
    assert.deepStrictEqual(responseData.errors.first_name, messages['ACT-FIRSTNAME-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.last_name, messages['ACT-LASTNAME-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.password, messages['ACT-PASSWORD-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.email, messages['ACT-EMAIL-REQUIRED']);
  });

  it('Create Account - Password not match confirm password', async () => {
    const request = {
      body: { ...accountMock.registrationMockRequest, confirm_password: 'Passsword29' },
    };
    const response = httpMocks.createResponse();
    accountController.createAccount(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.deepStrictEqual(responseData.message, 'Invalid requests');
    assert.deepStrictEqual(Object.keys(responseData.errors).length, 1);
    assert.deepStrictEqual(
      responseData.errors.confirm_password,
      messages['ACT-CONFIRM-PASSWORD-MATCH']
    );
  });

  it('Create Account - Account email exist', async () => {
    const request = {
      body: { ...accountMock.registrationMockRequest },
    };
    sandBox
      .stub(accountService, 'createAccount')
      .returns({ isSuccess: false, message: messages['ACT-EMAIL-EXIST'] });
    const response = httpMocks.createResponse();
    await accountController.createAccount(request, response);

    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.strictEqual(responseData.message, messages['ACT-EMAIL-EXIST']);
    assert.strictEqual(Object.keys(responseData.errors).length, 0);
  });
  it('Create Account - Success', async () => {
    const request = {
      body: { ...accountMock.registrationMockRequest },
    };
    sandBox
      .stub(accountService, 'createAccount')
      .returns({ isSuccess: true, message: messages['ACT-CREATED-SUCCESS'] });
    const response = httpMocks.createResponse();
    await accountController.createAccount(request, response);

    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.SUCCESS);
    assert.strictEqual(responseData.message, messages['ACT-CREATED-SUCCESS']);
    assert.strictEqual(Object.keys(responseData.errors).length, 0);
  });

  it('Login User - Invalid email or password', async () => {
    const request = {
        body: accountMock.loginMockRequest,
      },
      response = httpMocks.createResponse();
    sandBox
      .stub(accountService, 'loginUser')
      .returns({ isSuccess: false, message: messages['ACT-INVALID-LOGIN'] });

    await accountController.loginUser(request, response);
    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.strictEqual(responseData.message, messages['ACT-INVALID-LOGIN']);
    assert.strictEqual(Object.keys(responseData.errors).length, 0);
  });

});
