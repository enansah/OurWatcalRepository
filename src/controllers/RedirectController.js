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
    console.log('your id is:',tenantId);

    try {
        const room = await Room.findOne({ uniqueRoomId: tenantId });
        if (!room) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        const landlord = await Landlord.findOne({ roomIds: room._id }).populate('roomIds');
        if (!landlord) {
            return res.status(404).json({ success: false, message: 'Landlord not found' });
        }

        const totalConsumption = landlord.roomIds.reduce((sum, room) => {
            const lastReading = room.readings[room.readings.length - 1];
            return sum + (lastReading ? lastReading.readingValue : 0);
        }, 0);

        const lastReading = room.readings[room.readings.length - 1];
        const consumption = lastReading ? lastReading.readingValue : 0;
        const percentageUsage = totalConsumption ? ((consumption / totalConsumption) * 100).toFixed(1) : 0;
        const cost = calculateCost(consumption);

        // Update and save the last access time
        const currentTime = new Date();
        const lastAccessTime = room.lastAccessTime || currentTime; // If there is no previous access time, set it to current time
        room.lastAccessTime = currentTime;
        await room.save();

        res.json({
            success: true,
            readings: room.readings,
            percentageUsage,
            cost,
            lastAccessTime,
            roomNumber: room.roomNumber
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