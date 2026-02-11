const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

module.exports = async (req, res, next) => {
    const {authorization} = req.headers
    if(authorization){
        const token = authorization.split(' ')[1]
        try {
            const {email} = jwt.verify(token, 'swiftrails')
            const customer = await Customer.findByEmail(email)
            if(!customer) return res.status(401).json({message: 'Invalid credentials'})
            req.customer = customer
            next()
        } catch (error) {
            return res.status(401).json({message: 'Invalid credentials'})
        }
    } else {
        return res.status(401).json({message: 'Invalid credentials'})
    }
}