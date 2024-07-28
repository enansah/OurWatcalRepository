const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
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
    roomIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    uniqueId: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Landlord', LandlordSchema);
