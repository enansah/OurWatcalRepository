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
});

const Reading = mongoose.model('Reading', MBusDataSchema);

module.exports = Reading;
