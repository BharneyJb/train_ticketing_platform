const {body} = require("express-validator");
const checkValidationResult = require("./checkValidationResult")

const seatValidator =[
    body('code') .notEmpty().withMessage("Code is required").isString() .withMessage("Code must be a string").isLength({ max: 10 }).withMessage("Code must not exceed 10 characters"),
    body('coachId') .notEmpty().withMessage("Coach ID is required").isNumeric().withMessage("Coach ID must be a number"),
    body('cutomerId').notEmpty().withMessage("Customer ID is required").isNumeric().withMessage("Customer ID must be a number"),
    body('travelClassId').notEmpty().withMessage("Travel class ID is required").isNumeric().withMessage("Travel class ID must be a number"),
    body('status').notEmpty().withMessage("Status is required").isString().withMessage("Status must be a string").isIn(["available", "booked", "unavailable"]).withMessage("Status must be either 'available', 'booked', or 'unavailable'"),
    checkValidationResult

]


module.exports = seatValidator