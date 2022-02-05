require("dotenv").config();
const config = {
    serverPort: process.env.PORT || 5000,
    apiVersion: 'v1',
    database: {
      endPoint: process.env.MONGO_URI,
    },
    development: process.env.DEVELOPMENT,
  };
  
  module.exports = config;