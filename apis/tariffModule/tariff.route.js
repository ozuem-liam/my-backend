const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const {
  PspRegistrationSchema,
} = require('../../utils/validation-schemas/psp');
const { tariff } = require('../../helpers/controller.repository');

router.get('/', verifyToken, tariff.getTariff);
router.post('/', verifyToken, tariff.createTariff);
router.post('/update/:id', verifyToken, tariff.updateTariff);
router.delete('/delete/:id', verifyToken, tariff.deleteTariff);

module.exports = router;