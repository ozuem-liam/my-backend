const express = require('express'),
  router = express.Router(),
  registrationSchema = require('../utils/validation-schemas/account'),
  { account } = require('../controllers');

router.post('/', registrationSchema, account.createAccount);
router.patch('/', account.loginUser);

module.exports = router;
