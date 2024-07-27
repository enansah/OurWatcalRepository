const mongoose = require('mongoose');
const Reading = require('./src/models/Reading'); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/watcal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to get energy consumption for a particular ID and divide by the total consumption
async function getConsumption(id, year, month) {
  try {
    // Set the date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Query to find meter readings for the specified ID within the month
    const readingsForId = await Reading.aggregate([
      { $match: { id, timestamp: { $gte: startDate, $lt: endDate } } },
      { $unwind: '$dataRecords' },
      { $match: { 'dataRecords.quantity': 'Energy', 'dataRecords.unit': 'Wh', 'dataRecords.timestamp': { $gte: startDate, $lt: endDate } } },
      { $group: { _id: '$id', totalConsumption: { $sum: '$dataRecords.value' } } },
    ]);

    // Calculate total consumption for all IDs within the month
    const totalConsumptionForAll = await Reading.aggregate([
      { $match: { timestamp: { $gte: startDate, $lt: endDate } } },
      { $unwind: '$dataRecords' },
      { $match: { 'dataRecords.quantity': 'Energy', 'dataRecords.unit': 'Wh' } },
      { $group: { _id: null, totalConsumption: { $sum: '$dataRecords.value' } } },
    ]);

    // Extract the values
    const totalConsumptionForId = readingsForId[0] ? readingsForId[0].totalConsumption : 0;
    const totalConsumptionAll = totalConsumptionForAll[0] ? totalConsumptionForAll[0].totalConsumption : 0;

    // Divide the two values
    const result = totalConsumptionForId / totalConsumptionAll;

    console.log(`Total consumption for ID ${id} in ${year}-${month}: ${totalConsumptionForId} Wh`);
    console.log(`Total consumption for all IDs in ${year}-${month}: ${totalConsumptionAll} Wh`);
    console.log(`Result: ${result}`);

    return result;
  } catch (error) {
    console.error('Error fetching consumption data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Example usage
getConsumption('500023E', 2024, 7);
