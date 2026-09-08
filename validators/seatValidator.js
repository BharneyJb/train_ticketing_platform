const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const seatValidator = [
    body('code')
        .notEmpty()
        .withMessage("Code is required")
        .isString()
        .withMessage("Code must be a string")
        .isLength({ max: 10 })
        .withMessage("Code must not exceed 10 characters"),

    body('coachId')
        .notEmpty()
        .withMessage("Coach ID is required")
        .isNumeric()
        .withMessage("Coach ID must be a number"),

    body('customerId')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage("Customer ID must be a number"),

    body('travelClassId')
        .notEmpty()
        .withMessage("Travel class ID is required")
        .isNumeric()
        .withMessage("Travel class ID must be a number"),

    body('status')
        .optional()
        .isString()
        .withMessage("Status must be a string")
        .isIn(["Available", "Unavailable"])
        .withMessage("Status must be either 'Available' or 'Unavailable'"),

    checkValidationResult
];

module.exports = seatValidator;