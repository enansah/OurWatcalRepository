// routes/RedirectRoute.js
const express = require('express');
const router = express.Router();
const RedirectController = require('../controllers/RedirectController');


// Route to get tenant data
router.post('/viewTenant',RedirectController.getTenantData);

module.exports = router;
