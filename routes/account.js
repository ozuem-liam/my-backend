const express = require('express'),
  router = express.Router(),
  verifyToken = require('../middleware/auth'),
  { registrationSchema, changePasswordSchema } = require('../utils/validation-schemas/account'),
  { account } = require('../controllers');

router.post('/', registrationSchema, account.createAccount);
router.patch('/login', account.loginUser);
router.patch('/update/password', verifyToken, changePasswordSchema, account.changePassword);
router.get('/logout', account.logoutUser);

module.exports = router;
