const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  readingValue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  roomEmail: {
    type: String,
    required: true,
    unique: true,
  },
  electricityStatus: {
    type: Boolean,
    default: true,
  },
  meterid: {
    type: Number,
    required: true,
    unique: true,
  },
  readings: [readingSchema],
  uniqueRoomId: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Room', RoomSchema);
