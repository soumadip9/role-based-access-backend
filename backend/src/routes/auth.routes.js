const express = require('express');
const authController = require('../controllers/auth.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { handleValidationErrors } = require('../middlewares/validation.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/register', registerValidator, handleValidationErrors, authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with username/email and password
 *     tags: [Auth]
 */
router.post('/login', loginValidator, handleValidationErrors, authController.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', authUser, authController.me);

module.exports = router;
