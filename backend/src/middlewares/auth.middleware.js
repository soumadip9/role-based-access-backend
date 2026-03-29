const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
    const token = (req.headers.authorization || '').replace('Bearer ', '') || req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

function authAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    return next();
}

module.exports = { authUser, authAdmin };
