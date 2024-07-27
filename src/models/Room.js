// models/Room.js
const mongoose = require('mongoose');

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
      default: true
    }
});

module.exports = mongoose.model('Room', RoomSchema);
