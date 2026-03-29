function notFoundHandler(req, res) {
    res.status(404).json({ message: 'Route not found' });
}

function errorHandler(err, req, res, _next) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
