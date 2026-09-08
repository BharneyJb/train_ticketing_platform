const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const fareValidator = [
    body('passengerType')
        .notEmpty()
        .withMessage("Passenger Type is required")
        .isIn(['Adult', 'Child'])
        .withMessage("Passenger type must be either Adult or Child"),

    body('travelClassId')
        .notEmpty()
        .withMessage('Travel class ID is required')
        .isNumeric()
        .withMessage('Travel class ID must be a number'),

    body('amountId')
        .notEmpty()
        .withMessage('Amount is required')
        .isNumeric()
        .withMessage('Amount must be a number'),

    checkValidationResult
]

module.exports = fareValidator