const sinon = require('sinon'),
  assert = require('assert'),
  { resetStubAndSpys } = require('../testHelper');

const { Account } = require('../../database/models/Account'),
  { loginMockRequest, registrationMockRequest } = require('../mocks/account.mock'),
  messages = require('../../translation/messages.json'),
  accountService = require('../../services/accountService');

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
  it('login User Successful - Dashboard Destination', async () => {
    sandBox.stub(Account, 'findOne').resolves(new Account());
    sandBox.stub(Account.prototype, 'isAMatchPassword').resolves(true);
    const response = await accountService.loginUser(loginMockRequest);
    assert.strictEqual(response.isSuccess, true);
    assert.strictEqual(response.message, messages['ACT-LOGIN-SUCCESS']);
    assert.strictEqual(response.destination, 'dashboard');
    assert.ok(response.hasOwnProperty('account'));
  });
});
