// controllers/roomController.js
const Room = require('../models/Room');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getTotalReadingAndCost = async (req, res) => {
  try {
      const rooms = await Room.find();
      const totalReading = rooms.reduce((sum, room) => {
          const latestReading = room.readings.slice(-1)[0]?.readingValue || 0;
          return sum + latestReading;
      }, 0);

      const totalCost = calculateCost(totalReading);

      res.json({ totalReading, totalCost });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching total reading and cost', error });
  }
};




exports.deleteRoom = async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await Room.deleteOne({ roomNumber });

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
