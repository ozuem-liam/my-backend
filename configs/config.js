require("dotenv").config();
const config = {
    serverPort: process.env.PORT || 5000,
    apiVersion: 'v1',
    database: {
      endPoint: process.env.MONGO_URI,
    },
    encryptionKey: process.env.ENCRYPTION_KEY,
    development: process.env.DEVELOPMENT,
  
    appKey: process.env.APP_KEY,
    tokenLife: 1,
  };
  
  module.exports = config;