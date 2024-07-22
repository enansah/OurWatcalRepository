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

// Function to generate an 8-character unique identifier
function generateUniqueId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    let usedChars = new Set();

    while (uniqueId.length < 8) {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        if (!usedChars.has(randomChar)) {
            uniqueId += randomChar;
            usedChars.add(randomChar);
        }
    }

    return uniqueId;
}

// Pre-save hook to generate and assign unique identifier
LandlordSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next();
    }
    
    let uniqueId;
    let exists;

    do {
        uniqueId = generateUniqueId();
        exists = await mongoose.models.Landlord.findOne({ uniqueId });
    } while (exists);

    this.uniqueId = uniqueId;
    next();
});

module.exports = mongoose.model('Landlord', LandlordSchema);
