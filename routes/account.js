const express = require('express'),
  router = express.Router(),
  registrationSchema = require('../utils/validation-schemas/account'),
  validateRequest = require('../middleware/validate-request'),
  { account } = require('../controllers');

router.post('/', registrationSchema, validateRequest, account.createAccount);
router.patch('/', account.loginUser);

module.exports = router;
