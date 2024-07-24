const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    readingValue: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
    // Other reading fields as needed
});

module.exports = mongoose.model('Reading', readingSchema);
