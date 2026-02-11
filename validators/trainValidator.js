
const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const trainValidator = [
body('code').notEmpty().withMessage('Train code is required').isAlphanumeric().withMessage('Train code must be alphanumeric').isLength({ min: 3, max: 10 }).withMessage('Train code must be between 3 and 10 characters'),
checkValidationResult
];

module.exports = trainValidator;
