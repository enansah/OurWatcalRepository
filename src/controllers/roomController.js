// controllers/roomController.js
const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

// Define tier rates for cost calculation
const tierRates = [
    { upperLimit: 50, rate: 0.00 },     // Tier 1 (Lifeline)
    { upperLimit: 150, rate: 0.2460 },  // Tier 2
    { upperLimit: 300, rate: 0.3409 },  // Tier 3
    { upperLimit: 600, rate: 0.4642 },  // Tier 4
    { upperLimit: 1000, rate: 0.5693 }, // Tier 5
    { upperLimit: Infinity, rate: 0.6758 } // Tier 6
];

// Function to calculate cost based on consumption
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

    return cost.toFixed(2); // Return as string formatted to two decimal places
}

// Get rooms for a specific landlord by username and calculate total reading and cost for the past 2 weeks, last month, and current day
exports.getRooms = async (req, res) => {
    const { username } = req.query; // Assuming username is sent as a query parameter
    console.log('Received request to fetch total reading and cost');
    console.log('Username from query:', username);

    try {
        const landlord = await Landlord.findOne({ username }).populate('roomIds');
        if (!landlord) {
            return res.status(404).json({ message: 'Landlord not found' });
        }

        // Calculate the total sum of readings
        const rooms = landlord.roomIds.map(room => room.toObject());
        const totalSum = rooms.reduce((sum, room) => {
            const lastReading = room.readings[room.readings.length - 1];
            return sum + (lastReading ? lastReading.readingValue : 0);
        }, 0);

        // Calculate the total consumption for the current day across all rooms
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const totalConsumptionToday = landlord.roomIds.reduce((sum, room) => {
            const readings = room.readings.filter(reading => reading.timestamp.startsWith(today));
            const roomConsumption = readings.reduce((roomSum, reading) => roomSum + reading.readingValue, 0);
            return sum + roomConsumption;
        }, 0);

        // Calculate total reading and cost for the past 2 weeks
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 13); // 13 days before today + today = 14 days total
        const totalConsumptionTwoWeeks = landlord.roomIds.reduce((sum, room) => {
            const readings = room.readings.filter(reading => new Date(reading.timestamp) >= twoWeeksAgo);
            const roomConsumption = readings.reduce((roomSum, reading) => roomSum + reading.readingValue, 0);
            return sum + roomConsumption;
        }, 0);
        const weeklyCost = calculateCost(totalConsumptionTwoWeeks);

        // Calculate total reading and cost for the last month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const totalConsumptionLastMonth = landlord.roomIds.reduce((sum, room) => {
            const readings = room.readings.filter(reading => new Date(reading.timestamp) >= oneMonthAgo);
            const roomConsumption = readings.reduce((roomSum, reading) => roomSum + reading.readingValue, 0);
            return sum + roomConsumption;
        }, 0);
        const monthlyCost = calculateCost(totalConsumptionLastMonth);

        // Calculate and assign data for each room
        const roomsWithCalculations = rooms.map(room => {
            const lastReading = room.readings[room.readings.length - 1];
            const lastReadingValue = lastReading ? lastReading.readingValue : 0;
            const cost = calculateCost(lastReadingValue);
            const percentage = totalSum ? ((lastReadingValue / totalSum) * 100).toFixed(1) : 0;
            const lastReadingDate = lastReading ? lastReading.timestamp : 'N/A';
            const lastReadingTime = lastReading ? lastReading.timestamp : 'N/A';

            // Calculate the daily percentage for each room
            const dailyReadings = room.readings.filter(reading => reading.timestamp.startsWith(today));
            const dailyConsumption = dailyReadings.reduce((roomSum, reading) => roomSum + reading.readingValue, 0);
            const dailyPercentage = totalConsumptionToday ? ((dailyConsumption / totalConsumptionToday) * 100).toFixed(1) : 'N/A';

            return {
                ...room,
                lastReadingValue,
                cost,
                percentage,
                lastReadingDate,
                lastReadingTime,
                totalSum,
                totalCost: calculateCost(totalSum),
                dailyConsumption: dailyConsumption || 'N/A',
                dailyCost: calculateCost(dailyConsumption),
                dailyPercentage,
                totalConsumptionTwoWeeks,
                weeklyCost,
                totalConsumptionLastMonth,
                monthlyCost
            };
        });

        res.json({
            rooms: roomsWithCalculations,
            totalConsumptionTwoWeeks,
            weeklyCost,
            totalConsumptionLastMonth,
            monthlyCost,
            totalConsumptionToday,
            dailyCost: calculateCost(totalConsumptionToday)
        });
    } catch (err) {
        console.error('Error fetching rooms:', err);
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