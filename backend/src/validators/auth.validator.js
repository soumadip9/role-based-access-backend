const { body } = require('express-validator');

const registerValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage('username is required')
        .isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 chars'),
    body('email')
        .trim()
        .notEmpty().withMessage('email is required')
        .isEmail({
            allow_display_name: false,
            require_tld: true,
            allow_utf8_local_part: false,
            domain_specific_validation: true
        }).withMessage('valid email is required')
        .normalizeEmail(),
    body('password')
        .isString().withMessage('password must be a string')
        .isLength({ min: 6, max: 128 }).withMessage('password must be 6-128 chars')
];

const loginValidator = [
    body('password')
        .isString().withMessage('password is required')
        .notEmpty().withMessage('password is required'),
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 chars'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('email must be valid')
        .normalizeEmail(),
    body().custom((value) => {
        if (!value.username && !value.email) {
            throw new Error('username or email is required');
        }
        return true;
    })
];

module.exports = { registerValidator, loginValidator };
