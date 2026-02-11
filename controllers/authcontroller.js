const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const login = async (req, res) => {
    const {email, password} = req.body;
    let admin = await Admin.login(email, password);
    if (admin) {
        const token = jwt.sign({email: admin.email}, 'swiftrails', {expiresIn: '1y'});
        // localStorage.setItem("token", token);
        return res.json({message: 'Login successful', token});

    }
    return res.status(401).json({message: 'Invalid credentials'});    
}


module.exports = {login}