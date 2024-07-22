// controllers/landlordController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

exports.registerLandlord = async (req, res) => {
    const {
        username,
        email,
        password,
        dateOfBirth,
        houseAddress,
        meterSerialNumber,
        meterType,
        roomsData
    } = req.body;

    // console.log(username);
    // console.log(roomsData);

    try {
        // Check if username or email already exists
        let landlord = await Landlord.findOne({ username });
        if (landlord) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        landlord = await Landlord.findOne({ email });
        if (landlord) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert rooms
        const roomsToInsert = roomsData.map(room => ({
            roomNumber: room.room,
            roomEmail: room.email
        }));

        const insertedRooms = await Room.insertMany(roomsToInsert);
        const roomIds = insertedRooms.map(room => room._id);

        // Save landlord to database
        landlord = new Landlord({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            houseAddress,
            meterSerialNumber,
            meterType,
            roomIds,
        });

        await landlord.save();

        res.status(201).json({ msg: 'Landlord registered successfully' });
        console.log("Landlord registered successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.loginLandlord = async (req, res) => {
    const { username, password } = req.body;

    try {
        let landlord = await Landlord.findOne({ username });

        if (!landlord) {
        return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, landlord.password);

        if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid username or password' });
        }

        req.session.landlord = landlord; // Save landlord in session
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.forgotPasswordLandlord = async (req, res) => {
    const { email } = req.body;
    
    try {
        const landlord = await Landlord.findOne({ email });
    
        if (!landlord) {
        return res.status(400).json({ msg: 'User not found' });
        }
    
        const token = jwt.sign({ id: landlord._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        const transporter = nodemailer.createTransport({
        service: 'Outlook365', // Use your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        });
    
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: landlord.email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${process.env.FRONTEND_URL}/Lsetpasscode.html?token=${token}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ msg: 'Error sending email' });
        }
        res.status(200).json({ msg: 'Password reset email sent' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    };
    
    exports.resetPasswordLandlord = async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const landlord = await Landlord.findById(decoded.id);
    
        if (!landlord) {
        return res.status(400).json({ msg: 'Invalid token or user does not exist' });
        }
    
        const salt = await bcrypt.genSalt(10);
        landlord.password = await bcrypt.hash(newPassword, salt);
    
        await landlord.save();
        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    };