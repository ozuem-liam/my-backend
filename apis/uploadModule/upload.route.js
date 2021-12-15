const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const upload = require('./upload.service');
const { uploadImage } = require('../../helpers/controller.repository');

router.post('/upload', verifyToken, upload.single('image'), uploadImage.uploadImage);

module.exports = router;
