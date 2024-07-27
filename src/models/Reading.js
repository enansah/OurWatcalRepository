const mongoose = require('mongoose');

const MBusDataSchema = new mongoose.Schema({
  id: String,
  manufacturer: String,
  version: String,
  productName: String,
  medium: String,
  accessNumber: Number,
  status: String,
  signature: String,
  dataRecords: [{
    function: String,
    storageNumber: Number,
    tariff: Number,
    device: Number,
    unit: String,
    quantity: String,
    value: Number,
  }],
  timestamp: { type: Date, default: Date.now } // Add the timestamp field here
});

const Reading = mongoose.model('Reading', MBusDataSchema);

module.exports = Reading;
