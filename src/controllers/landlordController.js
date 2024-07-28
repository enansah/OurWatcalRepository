// controllers/landlordController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

// Function to generate a random 8-character string
function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

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

    // Generate uniqueRoomId for each room and insert rooms
    const roomsToInsert = roomsData.map(room => ({
      roomNumber: room.room,
      roomEmail: room.email,
      meterId: room.meterID, // Use meterId as in the schema
      uniqueRoomId: generateRandomString()
    }));

    const insertedRooms = await Room.insertMany(roomsToInsert);
    const roomIds = insertedRooms.map(room => room._id);

    // Generate uniqueId for the landlord
    const uniqueId = generateRandomString();

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
      uniqueId  // Add the uniqueId here
    });

    await landlord.save();

    res.status(201).json({ msg: 'Landlord registered successfully' });
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
        // console.log("something");
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








    exports.getTotalReadingAndCost = async (req, res) => {
      console.log('Received request to fetch total reading and cost');
    
      const { username } = req.query; // Assuming username is sent as a query parameter
    
      console.log('Received request to fetch total reading and cost');
      console.log('Username from query:', username);
    
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
    
      try {
        const landlord = await Landlord.findOne({ username }).populate('roomIds');
        if (!landlord) {
          console.log('Landlord not found');
          return res.status(404).json({ message: 'Landlord not found' });
        }
    
        console.log('Landlord found:', landlord);
    
        const totalReading = landlord.roomIds.reduce((sum, room) => {
          const latestReading = room.readings.slice(-1)[0]?.readingValue || 0;
          return sum + latestReading;
        }, 0);
    
        let totalCost = calculateCost(totalReading);
        console.log('Total Cost before conversion:', totalCost, 'Type:', typeof totalCost);
    
        // Ensure totalCost is a number
        totalCost = parseFloat(totalCost);
        if (isNaN(totalCost)) {
          totalCost = 0;
        }
        console.log('Total Cost after conversion:', totalCost, 'Type:', typeof totalCost);
    
        const formattedTotalReading = totalReading.toFixed(1);
    
        res.json({ totalReading: formattedTotalReading, totalCost: totalCost.toFixed(2) });
      } catch (error) {
        console.error('Error fetching total reading and cost:', error);
        res.status(500).json({ message: 'Error fetching total reading and cost', error });
      }
    };



    const tierRates = [
      { upperLimit: 50, rate: 0.00 },     // Tier 1 (Lifeline)
      { upperLimit: 150, rate: 0.2460 },  // Tier 2
      { upperLimit: 300, rate: 0.3409 },  // Tier 3
      { upperLimit: 600, rate: 0.4642 },  // Tier 4
      { upperLimit: 1000, rate: 0.5693 }, // Tier 5
      { upperLimit: Infinity, rate: 0.6758 } // Tier 6
    ];
    
    function calculateCost(consumption) {
      let cost = 0;
      let remainingConsumption = consumption;
    
      for (const tier of tierRates) {
        if (remainingConsumption > 0) {
          const tierConsumption = Math.min(remainingConsumption, tier.upperLimit);
          cost += tierConsumption * tier.rate;
          remainingConsumption -= tierConsumption;
        } else {
          break;
        }
      }
    
      return `GHs ${cost.toFixed(2)}`; // Format to two decimal places
    }







