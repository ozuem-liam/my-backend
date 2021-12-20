const { createLogger, transports, format } = require('winston');
const { timestamp, printf, combine, json } = format;
const configDB = require('../configs/config');
require('winston-mongodb');

const buildDevLogger = () => { 
  return createLogger({
  transports: [
    new transports.Console({
      filename: 'info.log',
      level: 'info',
      format: combine(timestamp(), json()),
    }),
    new transports.MongoDB({
      db: configDB.database.endPoint,
      options: { useUnifiedTopology: true },
      collection: 'audit',
      format: combine(timestamp(), json()),
    }),
  ],
});
}

module.exports = buildDevLogger;
