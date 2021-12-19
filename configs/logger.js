const { createLogger, transports, format, config } = require('winston');
const configDB = require('./config');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.Console({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: config.syslog.levels,
      db: configDB.database.endPoint,
      options: { useUnifiedTopology: true },
      collection: 'audit',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
