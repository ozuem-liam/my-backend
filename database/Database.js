require('dotenv').config();
const mongoose = require('mongoose'),
  config = require('../configs/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.endPoint, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection success');
  } catch (error) {
    console.error('MongoDB connection fail', error);
    process.exit(1);
  }
};

module.exports = connectDB;
