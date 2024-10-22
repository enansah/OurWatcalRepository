const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

// Function to generate a random 8-character ID
function generateUniqueId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.updateUserProfile = async (req, res) => {
    const {
        username,
        email,
        dateOfBirth,
        houseAddress,
        meterSerialNumber,
        meterType,
        roomsData
    } = req.body;

    try {
        const landlord = await Landlord.findById(req.session.landlord._id);

        if (!landlord) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Insert rooms
        const roomsToInsert = roomsData.map(room => ({
            roomNumber: room.room,
            roomEmail: room.email,
            uniqueRoomId: generateUniqueId()  // Add uniqueRoomId here
        }));

        const insertedRooms = await Room.insertMany(roomsToInsert);
        const roomIds = insertedRooms.map(room => room._id);

        // Add new roomIds to existing roomIds
        landlord.roomIds = landlord.roomIds.concat(roomIds);

        // Save updated landlord profile
        landlord.username = username || landlord.username;
        landlord.email = email || landlord.email;
        landlord.dateOfBirth = dateOfBirth || landlord.dateOfBirth;
        landlord.houseAddress = houseAddress || landlord.houseAddress;
        landlord.meterSerialNumber = meterSerialNumber || landlord.meterSerialNumber;
        landlord.meterType = meterType || landlord.meterType;

        await landlord.save();

        res.status(201).json({ msg: 'Landlord profile updated successfully' });
        console.log("Landlord profile updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const landlord = await Landlord.findById(req.session.landlord._id).select('-password');
        res.status(200).json(landlord);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
