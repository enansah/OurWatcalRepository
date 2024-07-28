// routes/tenantRoutes.js
const express = require('express');
const { registerTenant, loginTenant, forgotPasswordTenant, resetPasswordTenant } = require('../controllers/tenantController');
const {updateUserProfile, getUserProfile} = require('../controllers/tenantUpdate');
const TauthMiddleware = require('../middleware/TauthMiddleware');
const tenantDashboard = require('../controllers/tenantDashboard');

const router = express.Router();

router.post('/tenantSignup', registerTenant);
router.post('/tenantLogin', loginTenant);
router.post('/forgotPasswordTenant', forgotPasswordTenant);
router.post('/resetPasswordTenant', resetPasswordTenant);

router.post('/updateTenant', TauthMiddleware, updateUserProfile);
router.get('/getProfile', TauthMiddleware, getUserProfile);  //get user profile
router.get('/tenant/:username/data', tenantDashboard.getTenantData);
router.get('/tenant-history/:username/:month/:year', tenantDashboard.getTenantDataByMonth);


router.get('/tenantIsAuthenticated', (req, res) => {
    if (req.session.tenant) {
        res.status(200).json({ isAuthenticated: true, tenant: req.session.tenant });
    } 
    else {
        res.status(200).json({ isAuthenticated: false });
    }
    });

router.post('/tenantLogout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
        return res.status(500).json({ msg: 'Logout failed' });
        }
        res.status(200).json({ msg: 'Logout successful' });
    });
});

module.exports = router;
