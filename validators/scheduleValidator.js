const {body} = require("express-validator");
const checkValidationResult = require("./checkValidationResult")


const scheduleValidator = [
    body('name').notEmpty( {msg: "Name is required"} ).isLength({max: 255}).withMessage('Name cannot be more than 255 characters'),
    body('distance').notEmpty().withMessage('Distance is required').isNumeric().withMessage('Distance must be numeric').isDecimal({gt: -1}).withMessage('Distance must be a non-negative number').isFloat({gt: -1}).withMessage('Distance must be a non-negative number'),
    body('stationId').notEmpty( {msg: "Station ID is required"} ).isInt({min: 1, msg:"Invalid Station Id"}),
    body('arrivalTime').notEmpty().withMessage("Arrival time is required").isISO8601().withMessage("Arrival time must be a valid ISO 8601 format"),
    body('departureTime').notEmpty().withMessage("Departure time is required").isISO8601().withMessage("Departure time must be a valid ISO 8601 format"),
    body('departureStation') .notEmpty().withMessage("Departure station is required").isLength({max: 255}).withMessage("Departure station cannot be more than 255 characters"),
    checkValidationResult
]

module.exports = scheduleValidator