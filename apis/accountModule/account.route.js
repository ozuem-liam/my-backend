const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const {
  registrationSchema,
  changePasswordSchema,
} = require('../../utils/validation-schemas/account');
const { account } = require('../../helpers/controller.repository');

router.post('/', registrationSchema, account.createAccount);
router.patch('/login', account.loginUser);
router.patch('/update/password', verifyToken, changePasswordSchema, account.changePassword);
router.get('/logout', account.logoutUser);

module.exports = router;
