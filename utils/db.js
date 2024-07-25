// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const reading = require('../src/controllers/mbusController');

dotenv.config();



const interval = 15 * 60 * 1000; // 15 minutes in milliseconds
const delayBetweenReadings = 2 * 60 * 10; // 2 minutes in milliseconds

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const urls = [
    'http://172.18.130.54:8080/MBusData1.xml',  // Replace with actual URLs
    'http://172.18.130.54:8080/MBusData2.xml',  // Replace with actual URLs
    // Add more URLs as needed
  ];

  reading.readMetersSequentially(urls, interval, delayBetweenReadings); // Start the reading cycle
};

module.exports = connectDB;
