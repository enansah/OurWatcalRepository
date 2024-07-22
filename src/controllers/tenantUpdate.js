const Tenant = require('../models/Tenant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.updateUserProfile = async (req, res) => {
    const {
        username,
        email,
        dateOfBirth,
        houseAddress,
        meterSerialNumber,
        meterType
    } = req.body;


    try {
        const tenant = await Tenant.findById(req.session.tenant._id);

        if (!tenant) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Save updated tenant profile
        tenant.username = username || tenant.username;
        tenant.email = email || tenant.email;
        tenant.dateOfBirth = dateOfBirth || tenant.dateOfBirth;
        tenant.houseAddress = houseAddress || tenant.houseAddress;
        tenant.meterSerialNumber = meterSerialNumber || tenant.meterSerialNumber;
        tenant.meterType = meterType || tenant.meterType;

        await tenant.save();

        res.status(201).json({ msg: 'Tenant profile updated successfully' });
        console.log("Tenant profile updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getUserProfile = async (req, res) => {

    try {
        const tenant = await Tenant.findById(req.session.tenant._id).select('-password');
        res.status(200).json(tenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

