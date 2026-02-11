const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    const {authorization} = req.headers
    if(authorization){
        const token = authorization.split(' ')[1]
        try {
            const {email} = jwt.verify(token, 'swiftrails')
            const admin = await Admin.findByEmail(email)
            if(!admin) return res.status(401).json({message: 'Invalid credentials'})
            req.admin = admin
            next()
        } catch (error) {
            return res.status(401).json({message: 'Invalid credentials'})
        }
    } else {
        return res.status(401).json({message: 'Invalid credentials'})
    }
}