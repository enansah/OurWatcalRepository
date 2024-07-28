// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.delete('/deleteRoomHistory/:roomNumber/:month/:year', dataController.deleteRoomHistory);
router.get('/totalReadingCost/:month/:year', dataController.getTotalReadingAndCost);

module.exports = router;
