const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const stationValidator = [
    body('stationCode').notEmpty().withMessage('Station Code is required').isAlpha().withMessage('StationCode must be alphabetic').isLength({max: 255}).withMessage('Station Code cannot be more than 255 characters'),
    body('name').notEmpty().withMessage('Station name is required').isAlpha().withMessage('Station name must be alphabetic').isLength({max: 255}).withMessage('Station name cannot be more than 255 characters'),
    body('city').notEmpty().withMessage('city is required').isAlpha().withMessage('city must be alphabetic').isLength({max: 255}).withMessage('city cannot be more than 255 characters'),
    checkValidationResult
]

module.exports = stationValidator