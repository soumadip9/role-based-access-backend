const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Spotify Backend API',
            version: '1.0.0',
            description: 'Scalable REST API with authentication, RBAC, and music CRUD'
        },
        servers: [
            {
                url: process.env.PUBLIC_URL || 'http://localhost:3000',
                description: process.env.PUBLIC_URL ? 'Production server' : 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
