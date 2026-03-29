const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const swaggerSpec = require('./docs/swagger');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/music', musicRoutes);
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;