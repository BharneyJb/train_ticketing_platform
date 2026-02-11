
const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const travelClassValidator = [
    body('name').notEmpty().withMessage('Travel class name is required').isLength({ max: 255 }).withMessage('Travel class name cannot be more than 255 characters'),
    body('description').notEmpty().withMessage('Description is required').isLength({ max: 255 }).withMessage('Description cannot be more than 255 characters'),
    checkValidationResult
];

module.exports = travelClassValidator;
