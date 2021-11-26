const { createLogger, transports, format } = require('winston'),
  config = require('./config');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.Console({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: 'error',
      db: config.database.endPoint,
      options: { useUnifiedTopology: true },
      collection: 'gate',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
