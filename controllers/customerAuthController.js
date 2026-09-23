const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const customerLogin = async (req, res) => {
    const { email, password } = req.body;
    let customer = await Customer.customerLogin(email, password);
    if (customer) {
        const token = jwt.sign({ email: customer.email }, 'swiftrails', { expiresIn: '2h' });
        return res.json({
            message: 'Login successful',
            token,
            user: {
                id: customer.id,
                firstName: customer.firstName,
                surname: customer.surname,
                email: customer.email,
                phone: customer.phone || '',
                gender: customer.gender || '',
                dob: customer.dob || null,
                nin: customer.nin || '',
            }
        });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
}

module.exports = { customerLogin }
