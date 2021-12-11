const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const { FacilityRegistrationSchema, FacilityUpdateSchema  } = require('../../utils/validation-schemas/facility');
const { facility } = require('../../helpers/controller.repository');
const upload = require('../../helpers/upload.service');

router.get('/', verifyToken, facility.getFacility);
router.post(
  '/',
  verifyToken,
  upload.array('image'),
  FacilityUpdateSchema,
  facility.createFacility
);
router.post(
  '/update/:id',
  verifyToken,
  upload.array('image'),
  FacilityRegistrationSchema,
  facility.updateFacility
);
router.delete('/delete/:id', verifyToken, facility.deleteFacility);

module.exports = router;
