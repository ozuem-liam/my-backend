const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const {
  PspRegistrationSchema,
  GetPspSchema,
} = require('../../utils/validation-schemas/psp');
const { psp } = require('../../helpers/controller.repository');

router.get('/', verifyToken, psp.getPspOperators);
router.post('/', verifyToken, PspRegistrationSchema, psp.createPspOperator);
router.post('/update/:id', verifyToken, PspRegistrationSchema, psp.updatePspOperator);
router.delete('/delete/:id', verifyToken, psp.deletePspOperator);
// router.post('/update');

module.exports = router;