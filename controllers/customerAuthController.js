const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const customerLogin = async (req, res) => {
    const { email, password } = req.body;
    let customer = await Customer.customerLogin(email, password);
    if (customer) {
        const token = jwt.sign({ email: customer.email }, 'swiftrails', { expiresIn: '2hrs' });
        // Return user data along with token for Flutter app
        return res.json({
            message: 'Login successful',
            token,
            user: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone || ''
            }
        });

    }
    return res.status(401).json({ message: 'Invalid credentials' });
}


module.exports = { customerLogin }