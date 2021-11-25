const { validationResult } = require('express-validator'),
  { sendError } = require('../controllers/appController');

const validateRequest = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors: errors.array() });
    //res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validateRequest;
