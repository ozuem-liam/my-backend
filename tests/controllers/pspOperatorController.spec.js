const sinon = require('sinon');
const assert = require('assert');
const rewire = require('rewire');
const httpMocks = require('node-mocks-http');
const { resetStubAndSpys } = require('../testHelper');

const pspOperatorController = require('../../apis/pspOperatorModule/psp.operator.controller');
const pspOperatorService = require('../../apis/pspOperatorModule/psp.operator.service');
const createPspMockRequest = require('../mocks/psp.mock');
const messages = require('../../translation/messages.json');
const HttpStatusCode = require('../../models/HttpStatusCode');

describe('PspOperatorController', async () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it('Create Psp Operator - Invalid request', () => {
    const request = { body: {} };
    const response = httpMocks.createResponse();
    pspOperatorController.createPspOperator(request, response);
    const responseData = response._getData();
    assert.deepStrictEqual(response.statusCode, HttpStatusCode.SUCCESS);
    assert.deepStrictEqual(responseData.message, 'Invalid requests');
    assert.ok(Object.keys(responseData.errors).length > 3);
    assert.deepStrictEqual(responseData.errors.psp_operator_name, messages['PSP-OPERATOR-NAME-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.ceo_name, messages['PSP-OPERATOR-CEO-NAME-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.location, messages['PSP-OPERATOR-LOCATION-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.psp_operator_email, messages['PSP-OPERATOR-EMAIL-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.address, messages['PSP-OPERATOR-ADDRESS-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.psp_operator_phone_number, messages['PSP-OPERATOR-PHONE-NUMBER-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.district, messages['PSP-OPERATOR-DISTRICT-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.region, messages['PSP-OPERATOR-REGION-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.slots, messages['PSP-OPERATOR-SLOTS-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.bank_name, messages['PSP-OPERATOR-BANK-NAME-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.bank_branch_code, messages['PSP-OPERATOR-BANK-BRANCH-CODE-REQUIRED']);
    assert.deepStrictEqual(responseData.errors.account_number, messages['PSP-OPERATOR-ACT-NUMBER-REQUIRED']);
  });

  it('Create Psp Operator - Psp Operator email exist', async () => {
    const request = {
      body: { ...createPspMockRequest.createPspMockRequest },
    };
    sandBox
      .stub(pspOperatorService, 'create Psp Operator')
      .returns({ isSuccess: false, message: messages['ACT-EMAIL-EXIST'] });
    const response = httpMocks.createResponse();
    await pspOperatorController.createPspOperator(request, response);

    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.INVALID_REQUEST);
    assert.strictEqual(responseData.message, messages['ACT-EMAIL-EXIST']);
    assert.strictEqual(Object.keys(responseData.errors).length, 0);
  });
  it('Create Psp Operator - Success', async () => {
    const request = {
      body: { ...createPspMockRequest.createPspMockRequest },
    };
    sandBox
      .stub(pspOperatorService, 'createPsp Operator')
      .returns({ isSuccess: true, message: messages['ACT-CREATED-SUCCESS'] });
    const response = httpMocks.createResponse();
    await pspOperatorController.createPspOperator(request, response);

    const responseData = response._getData();
    assert.strictEqual(response.statusCode, HttpStatusCode.SUCCESS);
    assert.strictEqual(responseData.message, messages['ACT-CREATED-SUCCESS']);
    assert.strictEqual(Object.keys(responseData.errors).length, 0);
  });
});
