// routes/RedirectRoute.js
const express = require('express');
const router = express.Router();
const RedirectController = require('../controllers/RedirectController');

// Login route - no middleware
router.post('/tenantViewLogin', RedirectController.login);

// Get tenant data route - requires middleware
router.post('/viewTenantData', RedirectController.getTenantData);

module.exports = router;
