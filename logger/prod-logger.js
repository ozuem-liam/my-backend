const { createLogger, transports, format } = require('winston');
const { timestamp, printf, combine, json, errors } = format;
const configDB = require('../configs/config');
require('winston-mongodb');

const buildProdLogger = () => {
  return createLogger({
    transports: [
      new transports.Console({
        filename: 'info.log',
        level: 'info',
        format: combine(timestamp(), errors({ stack: tue }), json()),
      }),
      new transports.MongoDB({
        db: configDB.database.endPoint,
        options: { useUnifiedTopology: true },
        collection: 'audit',
        format: combine(timestamp(), json()),
      }),
    ],
  });
};

module.exports = buildProdLogger;
