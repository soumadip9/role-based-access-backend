const express = require('express');
const multer = require('multer');
const musicController = require('../controllers/music.controller');
const { authUser, authAdmin } = require('../middlewares/auth.middleware');
const { handleValidationErrors } = require('../middlewares/validation.middleware');
const { createMusicValidator, updateMusicValidator, musicIdParamValidator } = require('../validators/music.validator');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- User routes ---
/**
 * @swagger
 * /api/v1/music:
 *   post:
 *     summary: Create a music item
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authUser, upload.single('file'), createMusicValidator, handleValidationErrors, musicController.createMusic);

/**
 * @swagger
 * /api/v1/music:
 *   get:
 *     summary: Get current user's music list
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authUser, musicController.getMyMusic);

/**
 * @swagger
 * /api/v1/music/{musicId}:
 *   put:
 *     summary: Update current user's music
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:musicId', authUser, upload.single('file'), updateMusicValidator, handleValidationErrors, musicController.updateMusic);

/**
 * @swagger
 * /api/v1/music/{musicId}:
 *   delete:
 *     summary: Delete current user's music
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:musicId', authUser, musicIdParamValidator, handleValidationErrors, musicController.deleteMyMusic);

// --- Admin routes ---
/**
 * @swagger
 * /api/v1/music/admin/all:
 *   get:
 *     summary: Admin list all music
 *     tags: [Music Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/admin/all', authUser, authAdmin, musicController.getAllMusic);

/**
 * @swagger
 * /api/v1/music/admin/{musicId}/confirm:
 *   patch:
 *     summary: Admin approve a music item
 *     tags: [Music Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/admin/:musicId/confirm', authUser, authAdmin, musicIdParamValidator, handleValidationErrors, musicController.confirmMusic);

/**
 * @swagger
 * /api/v1/music/admin/{musicId}:
 *   delete:
 *     summary: Admin delete any music
 *     tags: [Music Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/admin/:musicId', authUser, authAdmin, musicIdParamValidator, handleValidationErrors, musicController.deleteMusic);

module.exports = router;
