const express = require('express');
const router = express.Router();
const { clientRegistrationSchema } = require('../../utils/validation-schemas/client');
const { client } = require('../../helpers/controller.repository');

router.post('/', clientRegistrationSchema, client.addClient);
router.get('/', client.getAllClients);
router.post('/edit/:id', clientRegistrationSchema, client.editClientInfo);
router.delete('/delete/:id', client.deleteAClient);

module.exports = router;
