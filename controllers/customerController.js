const Customer = require("../models/Customer")
const bcrypt = require('bcrypt')

let storeCustomer = async (req, res) => {
    let customer = new Customer(req.body)
    customer.password = bcrypt.hashSync(customer.password, 10);
    await customer.add()
    if (customer.id) {
        res.status(201).json({ message: 'Registration successful. Please log in.' })
    } else {
        res.status(500).json({ message: 'Unable to save customer' })
    }
}


let updateCustomer = async (req, res) => {
    // Use authenticated customer from middleware
    let customer = req.customer;
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    customer.setProp(req.body);
    const updated = await customer.update();
    if (!updated) {
        return res.status(500).json({ message: 'Update failed' });
    }
    // Re-fetch updated customer so we return fresh data
    const fresh = await Customer.findByEmail(customer.email);
    return res.json({
        message: 'Profile updated successfully',
        user: {
            id: fresh.id,
            firstName: fresh.firstName,
            surname: fresh.surname,
            email: fresh.email,
            phone: fresh.phone || '',
            gender: fresh.gender || '',
            dob: fresh.dob || null,
            nin: fresh.nin || '',
        }
    });
}

let deleteCustomer = async (req, res) => {
    const { id } = req.params;
    res.send(await Customer.delete(id))
}

let findCustomer = async (req, res) => {
    // Return authenticated customer from middleware
    const customer = req.customer;
    res.json({
        id: customer.id,
        firstName: customer.firstName,
        surname: customer.surname,
        email: customer.email,
        phone: customer.phone || '',
        gender: customer.gender || '',
        dob: customer.dob || null,
        nin: customer.nin || '',
    });
}

let allCustomers = async (req, res) => {
    let results = await Customer.find()
    res.send(results)
}

module.exports = { storeCustomer, allCustomers, findCustomer, updateCustomer, deleteCustomer }
