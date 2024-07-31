const Landlord = require('../models/Landlord');
const Room = require('../models/Room');

exports.login = async (req, res) => {
    const { landlordId, tenantId } = req.body;

    try {
        let landlord = await Landlord.findOne({ uniqueId: landlordId });
        if (!landlord) {
            return res.status(400).json({ msg: 'Invalid Landlord ID' });
        }

        let room = await Room.findOne({ uniqueRoomId: tenantId });
        if (!room) {
            return res.status(400).json({ msg: 'Invalid Tenant ID' });
        }
        console.log('tenantId:',tenantId)

        // Ensure the room belongs to the landlord
        if (!landlord.roomIds.includes(room._id)) {
            return res.status(400).json({ msg: 'Tenant does not belong to the specified Landlord' });
        }

        // Set session data
        req.session.landlord = {
            uniqueId: landlord.uniqueId,
            username: landlord.username
        };

        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




// Function to fetch tenant data and calculate percentage usage and cost
exports.getTenantData = async (req, res) => {
    const { tenantId } = req.body;
    console.log('your id is:', tenantId);

    try {
        const room = await Room.findOne({ uniqueRoomId: tenantId });
        if (!room) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        const landlord = await Landlord.findOne({ roomIds: room._id }).populate('roomIds');
        if (!landlord) {
            return res.status(404).json({ success: false, message: 'Landlord not found' });
        }

        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        // Calculate total monthly consumption for all rooms
        const totalMonthlyConsumption = landlord.roomIds.reduce((sum, room) => {
            const monthlyReadings = room.readings.filter(reading => {
                const readingDate = new Date(reading.timestamp);
                return readingDate >= oneMonthAgo && readingDate <= today;
            });
            const monthlyConsumption = monthlyReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
            return sum + monthlyConsumption;
        }, 0);

        // Calculate monthly consumption for the specific room
        const roomMonthlyReadings = room.readings.filter(reading => {
            const readingDate = new Date(reading.timestamp);
            return readingDate >= oneMonthAgo && readingDate <= today;
        });
        const roomMonthlyConsumption = roomMonthlyReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
        const monthlyPercentageUsage = totalMonthlyConsumption ? ((roomMonthlyConsumption / totalMonthlyConsumption) * 100).toFixed(1) : 0;
        const monthlyCost = calculateCost(roomMonthlyConsumption);

        // Calculate daily consumption for the current day
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(startOfToday);
        endOfToday.setDate(startOfToday.getDate() + 1);

        const totalDailyConsumption = landlord.roomIds.reduce((sum, room) => {
            const dailyReadings = room.readings.filter(reading => {
                const readingDate = new Date(reading.timestamp);
                return readingDate >= startOfToday && readingDate < endOfToday;
            });
            const dailyConsumption = dailyReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
            return sum + dailyConsumption;
        }, 0);

        const roomDailyReadings = room.readings.filter(reading => {
            const readingDate = new Date(reading.timestamp);
            return readingDate >= startOfToday && readingDate < endOfToday;
        });
        const roomDailyConsumption = roomDailyReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
        const dailyPercentageUsage = totalDailyConsumption ? ((roomDailyConsumption / totalDailyConsumption) * 100).toFixed(1) : 0;
        const dailyCost = calculateCost(roomDailyConsumption);

        // Calculate consumption for the last 2 weeks
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(today.getDate() - 13);

        const totalTwoWeeksConsumption = landlord.roomIds.reduce((sum, room) => {
            const twoWeeksReadings = room.readings.filter(reading => {
                const readingDate = new Date(reading.timestamp);
                return readingDate >= twoWeeksAgo && readingDate <= today;
            });
            const twoWeeksConsumption = twoWeeksReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
            return sum + twoWeeksConsumption;
        }, 0);

        const roomTwoWeeksReadings = room.readings.filter(reading => {
            const readingDate = new Date(reading.timestamp);
            return readingDate >= twoWeeksAgo && readingDate <= today;
        });
        const roomTwoWeeksConsumption = roomTwoWeeksReadings.reduce((sum, reading) => sum + reading.readingValue, 0);
        const twoWeeksPercentageUsage = totalTwoWeeksConsumption ? ((roomTwoWeeksConsumption / totalTwoWeeksConsumption) * 100).toFixed(1) : 0;
        const twoWeeksCost = calculateCost(roomTwoWeeksConsumption);

        // Determine the reading date (current day's reading) and the last reading date
        const readingDate = roomDailyReadings.length > 0 ? roomDailyReadings[0].timestamp : null;
        const lastReadingDate = room.readings.length > 0 ? room.readings[room.readings.length - 1].timestamp : null;

        // Update and save the last access time
        const currentTime = new Date();
        const lastAccessTime = room.lastAccessTime || currentTime; // If there is no previous access time, set it to current time
        room.lastAccessTime = currentTime;
        await room.save();

        // Get the month in 'YYYY-MM' format
        const month = oneMonthAgo.toISOString().slice(0, 7);

        res.json({
            success: true,
            readings: room.readings,
            monthlyReading: roomMonthlyConsumption,
            monthlyPercentageUsage,
            monthlyCost,
            roomDailyConsumption,
            dailyCost,
            dailyPercentageUsage,
            roomTwoWeeksConsumption,
            twoWeeksCost,
            twoWeeksPercentageUsage,
            readingDate,
            lastReadingDate,
            lastAccessTime,
            roomNumber: room.roomNumber,
            month
        });
    } catch (error) {
        console.error('Error fetching tenant data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to calculate cost based on consumption
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

    return cost.toFixed(2); // Return as string formatted to two decimal places
}
