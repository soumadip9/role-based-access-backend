const { body, param } = require('express-validator');

const createMusicValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('title is required')
        .isLength({ max: 120 }).withMessage('title must be at most 120 chars')
];

const updateMusicValidator = [
    param('musicId').isMongoId().withMessage('invalid musicId'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 120 }).withMessage('title must be 1-120 chars')
];

const musicIdParamValidator = [
    param('musicId').isMongoId().withMessage('invalid musicId')
];

module.exports = {
    createMusicValidator,
    updateMusicValidator,
    musicIdParamValidator
};
