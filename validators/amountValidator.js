
const { body } = require ("express-validator");
const checkValidationResult = require("./checkValidationResult");

const amountValidator = [
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .trim() // Remove leading and trailing whitespace
        .customSanitizer(value => value.replace(/[^\d.]/g, '')) // Remove non-numeric characters except dot
        .isNumeric().withMessage('Amount must be numeric')
        .isLength({ max: 255 }).withMessage('Amount cannot be more than 255 characters'),
    checkValidationResult
];

module.exports = amountValidator;

