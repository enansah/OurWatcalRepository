// controllers/roomController.js
const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

// Get rooms for a specific landlord by username
exports.getRooms = async (req, res) => {
    const { username } = req.query; // Assuming username is sent as a query parameter
    console.log('Received request to fetch total reading and cost');
    console.log('Username from query:', username);
    
    try {
      const landlord = await Landlord.findOne({ username }).populate('roomIds');
      if (!landlord) {
        return res.status(404).json({ message: 'Landlord not found' });
      }
      res.json(landlord.roomIds);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    };





    // Delete a specific room for a specific landlord by username
    exports.deleteRoom = async (req, res) => {
      const { roomNumber } = req.params;
      const { username } = req.query;

      console.log('your username is:',username);
    
      try {
        const landlord = await Landlord.findOne({ username });
        if (!landlord) {
          return res.status(404).json({ message: 'Landlord not found' });
        }
        const room = await Room.findOne({ roomNumber, _id: { $in: landlord.roomIds } });
        if (!room) {
          return res.status(404).json({ error: 'Room not found' });
        }
    
        await Room.deleteOne({ _id: room._id });
    
        // Remove the room reference from the landlord's roomIds
        landlord.roomIds.pull(room._id);
        await landlord.save();
    
        res.status(200).json({ message: 'Room deleted successfully' });
      } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    



// Get a specific room by ID for a specific landlord by username
exports.getRoomById = async (req, res) => {
  const { username, id } = req.params;

  try {
    const landlord = await Landlord.findOne({ username });
    if (!landlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    const room = await Room.findOne({ _id: id, _id: { $in: landlord.roomIds } });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






exports.getReadingForLast14Days = async (req, res) => {
  try {
      const username = req.query.username;
      if (!username) {
          return res.status(400).json({ error: 'Username is required' });
      }

      // Find landlord by username
      const landlord = await Landlord.findOne({ username }).populate('roomIds');
      if (!landlord) {
          return res.status(404).json({ error: 'Landlord not found' });
      }

      // Get readings for the last 14 days for all rooms
      let readings = [];
      let today = new Date();
      for (let i = 0; i < 14; i++) {
          let currentDate = new Date(today);
          currentDate.setDate(today.getDate() - i);

          let totalReading = null; // Set to null initially
          for (let room of landlord.roomIds) {
              let roomReadings = room.readings.filter(reading => {
                  let readingDate = new Date(reading.timestamp);
                  return readingDate.toDateString() === currentDate.toDateString();
              });

              for (let reading of roomReadings) {
                  if (totalReading === null) totalReading = 0; // Initialize to 0 if readings are found
                  totalReading += reading.readingValue;
              }
          }

          // Push 'N/A' if no readings were found, otherwise push the total reading
          readings.push(totalReading === null ? 'N/A' : totalReading);
      }

      res.status(200).json({ readings });
  } catch (error) {
      console.error('Error fetching readings:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};