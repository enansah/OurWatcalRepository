// models/Tenant.js
const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  readingValue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const TenantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  houseAddress: {
    type: String,
  },
  meterSerialNumber: {
    type: String,
  },
  meterType: {
    type: String,
  },
  readings: [readingSchema],
  lastDashboardVisit: {
    type: Date,
  },
});

module.exports = mongoose.model('Tenant', TenantSchema);
