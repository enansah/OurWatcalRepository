// controllers/tenantController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Tenant = require('../models/Tenant');

exports.registerTenant = async (req, res) => {
    const {
        username,
        email,
        password,
        dateOfBirth,
        houseAddress,
        meterSerialNumber,
        meterType
    } = req.body;

    try {
        // Check if username or email already exists
        let tenant = await Tenant.findOne({ username });
        if (tenant) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        tenant = await Tenant.findOne({ email });
        if (tenant) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save tenant to database
        tenant = new Tenant({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            houseAddress,
            meterSerialNumber,
            meterType
        });

        await tenant.save();

        res.status(201).json({ msg: 'Tenant registered successfully' });
        console.log("Tenant registered successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.loginTenant = async (req, res) => {
    const { username, password } = req.body;

    try {
        let tenant = await Tenant.findOne({ username });

        if (!tenant) {
        return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, tenant.password);

        if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid username or password' });
        }

        req.session.tenant = tenant; // Save tenant in session
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.forgotPasswordTenant = async (req, res) => {
const { email } = req.body;

try {
    const tenant = await Tenant.findOne({ email });

    if (!tenant) {
    return res.status(400).json({ msg: 'User not found' });
    }

    const token = jwt.sign({ id: tenant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
    service: 'Outlook365', // Use your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: tenant.email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${process.env.FRONTEND_URL}/Tsetpasscode.html?token=${token}`,
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

exports.resetPasswordTenant = async (req, res) => {
const { token, newPassword } = req.body;

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tenant = await Tenant.findById(decoded.id);

    if (!tenant) {
    return res.status(400).json({ msg: 'Invalid token or user does not exist' });
    }

    const salt = await bcrypt.genSalt(10);
    tenant.password = await bcrypt.hash(newPassword, salt);

    await tenant.save();
    res.status(200).json({ msg: 'Password reset successful' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};