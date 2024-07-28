// middleware/authMiddleware.js

module.exports = (req, res, next) => {
    if (req.session && req.session.landlord) {
        req.landlordId = req.session.landlord.uniqueId; // Extract landlordId from session
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};
