const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const { invoice } = require('../../helpers/controller.repository');

router.get('/', verifyToken, invoice.getInvoice);
router.post('/facility', verifyToken, invoice.createFacilityInvoice);
router.post('/psp', verifyToken, invoice.createPspOperatorInvoice);
router.post('/update/:id', verifyToken, invoice.updateInvoice);
router.delete('/delete/:id', verifyToken, invoice.deleteInvoice);

module.exports = router;
