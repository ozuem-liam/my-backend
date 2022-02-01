const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const {
  FacilityRegistrationSchema,
  FacilityUpdateSchema,
} = require('../../utils/validation-schemas/facility');
const { facility } = require('../../helpers/controller.repository');

router.get('/toggle/approved/:id', verifyToken, facility.toggleStatus);

router.get('/billing', verifyToken, facility.getAllFacilityByBillingType);

router.get('/status', verifyToken, facility.getAllFacilityByStatus);

router.get('/count', verifyToken, facility.getCountOfAllFacilities);

router.get('/', verifyToken, facility.getFacility);

router.get('/:id', verifyToken, facility.getFacilityById);


router.post('/', verifyToken, FacilityRegistrationSchema, facility.createFacility);


router.post('/update/:id', verifyToken, FacilityRegistrationSchema, facility.updateFacility);

router.post('/enumerated', verifyToken, FacilityUpdateSchema, facility.createEnumeratedFacility);

router.delete('/delete/:id', verifyToken, facility.deleteFacility);

module.exports = router;
