const express = require('express');
const router = express.Router();
const { provider } = require('../../helpers/controller.repository');

router.get('/', provider.getProviders);
router.post('/', provider.addAProvider);
router.delete('/delete/:id', provider.deleteAProvider);

module.exports = router;