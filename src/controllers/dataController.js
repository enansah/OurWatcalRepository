const Room = require('../models/Room');

// Helper function to calculate monthly usage
const calculateMonthlyUsage = (readings) => {
  let totalUsage = 0;
  readings.sort((a, b) => a.timestamp - b.timestamp); // Ensure readings are sorted by timestamp

  readings.forEach((reading, index) => {
    if (index > 0) {
      totalUsage += reading.readingValue - readings[index - 1].readingValue;
    }
  });

  return totalUsage;
};

// Helper function to get monthly readings
const getMonthlyReadings = async (roomNumber, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  try {
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      throw new Error('Room not found');
    }

    const monthlyReadings = room.readings.filter(reading =>
      reading.timestamp >= startDate && reading.timestamp < endDate
    );

    return monthlyReadings;
  } catch (error) {
    console.error('Error fetching monthly readings:', error);
    return [];
  }
};

// Helper function to calculate cost based on consumption
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

// Controller function to get total reading and cost for a specific month
exports.getTotalReadingAndCost = async (req, res) => {
    const { month, year } = req.params;
  
    try {
      const rooms = await Room.find({});
      let totalReadings = 0;
  
      const data = await Promise.all(rooms.map(async (room) => {
        const monthlyReadings = await getMonthlyReadings(room.roomNumber, month, year);
        const monthlyUsage = calculateMonthlyUsage(monthlyReadings);
        totalReadings += monthlyUsage;
  
        return {
          roomNumber: room.roomNumber,
          currentReading: monthlyUsage,
          price: calculateCost(monthlyUsage),
          // Initialize percentage to 0 to ensure it's defined
          percentage: 0
        };
      }));
  
      // Calculate total readings
      const totalSum = data.reduce((sum, room) => sum + room.currentReading, 0);
  
      // Update the percentage for each room
      data.forEach(item => {
        item.percentage = totalSum ? ((item.currentReading / totalSum) * 100).toFixed(2) : 0;
        // Convert NaN or undefined to 0%
        item.percentage = Number.isNaN(item.percentage) ? 0 : item.percentage;
      });
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error getting total reading and cost:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  


  exports.deleteRoomHistory = async (req, res) => {
    const { roomNumber, month, year } = req.params;
  
    try {
      const room = await Room.findOne({ roomNumber });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Filter out readings for the specified month and year
      room.readings = room.readings.filter(reading => {
        const readingDate = new Date(reading.timestamp);
        return !(readingDate.getMonth() === new Date(`${month} 1, ${year}`).getMonth() && readingDate.getFullYear() === parseInt(year));
      });
  
      await room.save();
      res.status(200).json({ message: 'Room history deleted successfully' });
    } catch (error) {
      console.error('Error deleting room history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
