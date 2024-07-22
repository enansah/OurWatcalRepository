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
  readings: [readingSchema],
  uniqueRoomId: {
    type: String,
    unique: true,
    required: true
  }
});

// Function to generate a random 8-character string
function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Pre-save hook to generate random uniqueRoomId
RoomSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate unique uniqueRoomId
    let uniqueRoomId;
    let exists;
    do {
      uniqueRoomId = generateRandomString();
      exists = await mongoose.models.Room.findOne({ uniqueRoomId });
    } while (exists);
    this.uniqueRoomId = uniqueRoomId;
  }
  next();
});

module.exports = mongoose.model('Room', RoomSchema);
