const Customer = require("../models/Customer")
const bcrypt = require('bcrypt')

let storeCustomer = async (req, res) => {
    let customer = new Customer(req.body)
    customer.password = bcrypt.hashSync(customer.password, 10);
    await customer.add()
    if (customer.id) {
        res.send('Customer saved Successfully')
    } else {
        res.send('Unable to save customer')
    }
}


let updateCustomer = async (req, res) => {
    // Use authenticated customer from middleware
    let customer = req.customer;
    customer.setProp(req.body);
    const updated = await customer.update();
    // Return user data for Flutter app
    res.json({
        message: 'Profile updated successfully',
        user: {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            phone: updated.phone || ''
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
        name: customer.name,
        email: customer.email,
        phone: customer.phone || ''
    });
}

let allCustomers = async (req, res) => {
    let results = await Customer.find()
    res.send(results)
}

module.exports = { storeCustomer, allCustomers, findCustomer, updateCustomer, deleteCustomer }