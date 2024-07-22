// controllers/RoomController.js

const Room = require('../models/Room');  // Ensure you import the correct model

exports.updateElectricityStatus = async (req, res) => {
  const { roomNumber, disconnect } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      { roomNumber: roomNumber },
      { electricityStatus: !disconnect },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Code to communicate with the relay hardware
    await toggleRelay(roomNumber, disconnect);

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error updating electricity status', error });
  }
};

const toggleRelay = async (roomNumber, disconnect) => {
  // This is where you would add the code to control the relay hardware.
  // For example, if you're using a GPIO library or sending a request to another service
  // that controls the relay.
  // For demonstration purposes, we'll just log the action.
  console.log(`Toggling relay for room ${roomNumber}: ${disconnect ? 'OFF' : 'ON'}`);

  // Example using a GPIO library like onoff
  const Gpio = require('onoff').Gpio;

  // Assuming a mapping function to get the GPIO pin from the roomNumber
  const pinNumber = getGpioPinFromRoomNumber(roomNumber);

  const relay = new Gpio(pinNumber, 'out');

  // Set relay state
  relay.writeSync(disconnect ? 0 : 1);

  // Clean up
  relay.unexport();
};

/* // Mock function to map roomNumber to GPIO pin number
const getGpioPinFromRoomNumber = (roomNumber) => {
  // Add your logic to map roomNumber to GPIO pin number
  // This is just an example
  const roomToPinMapping = {
    'Room1': 17,
    'Room2': 18,
    // Add other mappings
  };

  return roomToPinMapping[roomNumber];
}; */
