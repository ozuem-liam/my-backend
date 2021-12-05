const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const {
  PspRegistrationSchema,
} = require('../../utils/validation-schemas/psp');
const { tariff } = require('../../helpers/controller.repository');
const upload = require('../../helpers/upload.service');

router.get('/', verifyToken, tariff.getTariff);
router.post('/', verifyToken, upload.single('image'), tariff.createTariff);
router.post('/update/:id', verifyToken, upload.single('image'), tariff.updateTariff);
router.delete('/delete/:id', verifyToken, tariff.deleteTariff);

module.exports = router;