// middleware/authMiddleware.js

module.exports = (req, res, next) => {
    if (req.session && req.session.landlord) {
        next();
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};
