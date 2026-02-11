const {body} = require('express-validator')
const checkValidationResult = require("./checkValidationResult")


const customerValidator = [
    body('firstName').notEmpty().withMessage('First Name is required').isAlpha().withMessage('Name must be alphabtic').isLength({max:255}).withMessage('Name cannot be more than 255 characters'),
    body('surname').notEmpty().withMessage('First Name is required').isAlpha().withMessage('Name must be alphabtic').isLength({max:255}).withMessage('Name cannot be more than 255 characters'),
    body('gender').isIn(['Male', 'Female']).withMessage('Only Male or Female is allowed'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').isLength({ max: 255 }).withMessage('Email cannot be more than 255 characters'),
    body('dob').notEmpty().withMessage('Date of birth is required').isDate().withMessage('Invalid date of birth format').isBefore().withMessage('Date of birth cannot be in the future'),
    body('phone').notEmpty().withMessage('Phone is required').isMobilePhone("en-NG").withMessage('Invalid phone number format'),
    body('password').notEmpty().withMessage('Password is required').isStrongPassword(),
    body('nin').notEmpty( ).withMessage( "NIN number is required" ).isNumeric().withMessage('NIN must be numeric' ).isLength({max: 11}),
    checkValidationResult
]

module.exports = customerValidator