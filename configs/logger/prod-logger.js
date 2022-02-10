const { createLogger, transports, format } = require('winston');
const { timestamp, printf, combine, json, errors } = format;
const configDB = require('../config');
require('winston-mongodb');

const buildProdLogger = () => {
  return createLogger({
    transports: [
      new transports.Console({
        filename: 'info.log',
        level: 'info',
        format: combine(timestamp(), errors({ stack: tue }), json()),
      }),
    ],
  });
};

module.exports = buildProdLogger;
