const sinon = require('sinon');
const assert = require('assert');
const rewire = require('rewire');
const httpMocks = require('node-mocks-http');
const { resetStubAndSpys } = require('../testHelper');

const accountController = require('../../apis/accountModule/account.controller');
const accountService = require('../../apis/accountModule/account.service');
const accountMock = require('../mocks/account.mock');
const messages = require('../../translation/messages.json');
const HttpStatusCode = require('../../models/HttpStatusCode');

describe('AccountController', async () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it('Create Account - Password not match confirm password', done => {
    let responseData;
    const request = {
      body: { ...accountMock.registrationMockRequest, confirm_password: 'Passsword29' },
    };
    const response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    response.on('end', () => {
      responseData = response._getData();
      done();
    });
    response.on('data', () => {
      responseData = response._getData();
      console.log("data--", responseData);
      done();
    });
    accountController.createAccount(request, response);
    assert.deepStrictEqual(responseData.statusCode, HttpStatusCode.INVALID_REQUEST);
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
