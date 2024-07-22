// controllers/tenantController.js
const Tenant = require('../models/Tenant');

// Utility function for cost calculation
function calculateCost(consumption) {
  const tierRates = [
    { upperLimit: 50, rate: 0.00 },
    { upperLimit: 150, rate: 0.2460 },
    { upperLimit: 300, rate: 0.3409 },
    { upperLimit: 600, rate: 0.4642 },
    { upperLimit: 1000, rate: 0.5693 },
    { upperLimit: Infinity, rate: 0.6758 }
  ];

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

  return `Gh₵ ${cost.toFixed(2)}`; // Format to two decimal places
}

exports.getTenantData = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ username: req.params.username }).exec();
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    const currentTime = new Date();
    console.log(currentTime);
    const lastDashboardVisit = tenant.lastDashboardVisit || currentTime;

    const reading = tenant.readings[tenant.readings.length - 1] || { readingValue: 0, timestamp: currentTime };
    const lastReading = tenant.readings.find(r => r.timestamp <= lastDashboardVisit) || reading;
    console.log(lastReading);

    tenant.lastDashboardVisit = currentTime;
    await tenant.save();

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';
    const formatTime = (time) => time ? new Date(time).toLocaleTimeString() : 'N/A';
    const formatValue = (value) => value ? `${value.toFixed(1)}kW` : '0kWh'; // Format to one decimal place

    res.json({
      date: formatDate(reading.timestamp),
      readingTime: formatTime(reading.timestamp),
      readingValue: formatValue(reading.readingValue),
      lastReadingTime: formatTime(lastReading.timestamp),
      lastReadingValue: formatValue(lastReading.readingValue),
      lastReadingDate: formatDate(lastReading.timestamp),
      kwh: reading.readingValue.toFixed(1),
      cost: calculateCost(reading.readingValue)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTenantDataByMonth = async (req, res) => {
  try {
    const { username, month, year } = req.params;
    const tenant = await Tenant.findOne({ username });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const readings = tenant.readings.filter(reading => {
      const readingDate = new Date(reading.timestamp);
      return readingDate.getMonth() === monthIndex && readingDate.getFullYear() === parseInt(year);
    });

    const totalConsumption = readings.reduce((total, reading) => total + reading.readingValue, 0);
    const lastReading = readings[readings.length - 1] || { readingValue: 0, timestamp: 'N/A' };

    res.json({
      date: lastReading.timestamp === 'N/A' ? 'N/A' : lastReading.timestamp.toISOString().split('T')[0],
      readingTime: lastReading.timestamp === 'N/A' ? 'N/A' : lastReading.timestamp.toISOString().split('T')[1].split('.')[0],
      readingValue: `${lastReading.readingValue.toFixed(1)}kWh`,
      lastReadingTime: lastReading.timestamp === 'N/A' ? 'N/A' : lastReading.timestamp.toISOString().split('T')[1].split('.')[0],
      lastReadingValue: `${lastReading.readingValue.toFixed(1)}kWh`,
      lastReadingDate: lastReading.timestamp === 'N/A' ? 'N/A' : lastReading.timestamp.toISOString().split('T')[0],
      kwh: `${totalConsumption.toFixed(1)}KW`,
      cost: calculateCost(totalConsumption)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

