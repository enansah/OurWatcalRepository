const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Route to get all rooms for a specific landlord by username
router.get('/rooms', roomController.getRooms);

// Route to get a specific room by ID for a specific landlord by username
router.get('/rooms/:id', roomController.getRoomById);

router.delete('/rooms/:roomNumber', roomController.deleteRoom);


router.get('/readings/last14days', roomController.getReadingForLast14Days);

module.exports = router;
