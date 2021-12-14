const sinon = require('sinon');
const assert = require('assert');
const { resetStubAndSpys } = require('../testHelper');

const { Account } = require('../../apis/accountModule/account.model');
const { loginMockRequest } = require('../mocks/account.mock');
const messages = require('../../translation/messages.json');
const accountService = require('../../apis/accountModule/account.service');

describe('AccountService', async () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it('login User - User not found', async () => {
    sandBox.stub(Account, 'findOne').resolves(null);
    const response = await accountService.loginUser(loginMockRequest);
    assert.strictEqual(response.isSuccess, false);
    assert.strictEqual(response.message, messages['USER-NOT-FOUND']);
  });

  it('login User - Invalid email or password', async () => {
    sandBox.stub(Account, 'findOne').resolves(new Account());
    sandBox.stub(Account.prototype, 'isAMatchPassword').resolves(false);
    const response = await accountService.loginUser(loginMockRequest);
    assert.strictEqual(response.isSuccess, false);
    assert.strictEqual(response.message, messages['ACT-INVALID-LOGIN']);
  });
});
