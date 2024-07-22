// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.get('/totalReadingAndCost', roomController.getTotalReadingAndCost);
router.delete('/room/:roomNumber', roomController.deleteRoom);


module.exports = router;