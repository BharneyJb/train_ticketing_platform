const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const stationValidator = [
    body('stationCode')
        .notEmpty()
        .withMessage('Station Code is required')
        .isAlpha()
        .withMessage('StationCode must contain only letters')
        .isLength({ max: 255 })
        .withMessage('Station Code cannot be more than 255 characters'),

    body('name')
        .notEmpty()
        .withMessage('Station name is required')
        .matches(/^[A-Za-z ]+$/)
        .withMessage('Station name must contain only letters and spaces')
        .isLength({ max: 255 })
        .withMessage('Station name cannot be more than 255 characters'),

    body('city')
        .notEmpty()
        .withMessage('City is required')
        .matches(/^[A-Za-z ]+$/)
        .withMessage('City must contain only letters and spaces')
        .isLength({ max: 255 })
        .withMessage('City cannot be more than 255 characters'),

    checkValidationResult
];

module.exports = stationValidator;