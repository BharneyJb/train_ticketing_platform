const { validationResult } = require("express-validator")

const checkValidationResult = (req, res, next) => {
    let result = validationResult(req)
    if (!result.isEmpty()) {
        result = result.mapped()
        for (const key in result) {
            result[key] = result[key].msg
        }
        return res.status(422).json({ errors: result })
    }
    next();
}

module.exports = checkValidationResult