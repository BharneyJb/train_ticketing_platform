const {body} = require("express-validator")
const checkValidationResult = require("./checkValidationResult")


const coachValidator = [
    body('code').notEmpty().withMessage('Code is required').isAlphanumeric().withMessage('Code ID must be alphanumeric'),
    body('trainId').notEmpty().withMessage('Train ID is required').isNumeric().withMessage('Train ID must be numeric'),
    body('travelClassId').notEmpty().withMessage('Travel-Class ID is required').isNumeric().withMessage('Travel-Class ID must be numeric'),
    checkValidationResult
]

module.exports = coachValidator