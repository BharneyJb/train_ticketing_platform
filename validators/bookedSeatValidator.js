const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const bookedSeatValidator = [
    body('bookingId').notEmpty().withMessage('Booking Id is required').isNumeric().withMessage('Booking Id must be Numeric'),
    body('seatId').notEmpty().withMessage('Seat Id is required').isNumeric().withMessage('Seat Id must be Numeric'),
    body('passengerType').notEmpty().withMessage('Select either Adult or Child').isAlpha().withMessage('Passenger Type must be alphabetic').isLength({max: 255}).withMessage('Station name cannot be more than 255 characters'),
    body('phone').notEmpty().withMessage('Phone is required').isMobilePhone("en-NG").withMessage('Invalid phone number format'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').isLength({ max: 255 }).withMessage('Email cannot be more than 255 characters').normalizeEmail(),
    body('nin').notEmpty().withMessage('NIN is required').isNumeric().withMessage('Input your NIN number').isLength({max: 11}).withMessage('NiN cannot be more than 11 numbers'),
    body('amount').notEmpty().withMessage('payment is cumpolsory').isNumeric().withMessage('Input amount in number'),
    checkValidationResult
]

module.exports = bookedSeatValidator
