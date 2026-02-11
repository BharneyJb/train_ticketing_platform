const {body} = require("express-validator")
const checkValidationResult = require("./checkValidationResult")


const bookingValidator = [
    body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Invalid date').isLength().withMessage('Please use the format YYYY-MM-DD'),
    body('arrivalTime').notEmpty().withMessage('Please enter a valid arrival time').isTime().withMessage('Invalid time format').isLength({max:20}).withMessage('Arrival time must be in HH:MM format'),
    body('departureTime').notEmpty().withMessage('Please enter a valid departure time').isTime().withMessage('Invalid time format').isLength({max:20}).withMessage('Departure time must be in HH:MM format'),
    body('scheduleId').notEmpty().withMessage('Schedule ID is required').isNumeric().withMessage('Schedule ID must be numeric'),
    body('customerId').notEmpty().withMessage('Customer ID is required').isNumeric().withMessage('Customer ID must be numeric'),
    checkValidationResult
]

module.exports = bookingValidator