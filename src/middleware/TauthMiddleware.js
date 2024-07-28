// middleware/TauthMiddleware.js

module.exports = (req, res, next) => {
    if (req.session && req.session.tenant) {
        next();
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};
