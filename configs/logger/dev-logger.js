const { createLogger, transports, format } = require('winston');
const { timestamp, printf, combine, json } = format;
const configDB = require('../config');
require('winston-mongodb');

const buildDevLogger = () => { 
  return createLogger({
  transports: [
    new transports.Console({
      filename: 'info.log',
      level: 'info',
      format: combine(timestamp(), json()),
    }),
  ],
});
}

module.exports = buildDevLogger;
