const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const { category } = require('../../helpers/controller.repository');

router.get('/', verifyToken, category.getCategory);
router.post('/', verifyToken, category.createCategory);
router.post('/update/:id', verifyToken, category.updateCategory);
router.delete('/delete/:id', verifyToken, category.deleteCategory);

module.exports = router;