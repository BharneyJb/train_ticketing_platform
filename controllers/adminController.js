const Admin = require("../models/Admin")
const bcrypt = require('bcrypt');

let storeAdmin = async (req, res) => {
    let admin = new Admin(req.body)
    admin.password = bcrypt.hashSync(admin.password, 10);
    await admin.add()
    if (admin.id) {
        res.send('Admin saved successfully')
    } else {
        res.send('Unable to save admin')
    }
}

let updateAdmin = async (req, res)=> {
    const {id} = req.params;
    let admin = await Admin.findById(id)
    admin.setProp(req.body)
    res.send(await admin.update())
}

let deleteAdmin = async(req, res) => {
    const{id} = req.params;
    res.send(await Admin.delete(id))

}

let findAdmin = async (req, res) => {
    const{id} = req.params;
    let admin = await Admin.findById(id)
    res.send(admin);
}

let allAdmins = async (req, res) =>{
    let results = await Admin.find()
    res.send(results)
}

module.exports = {storeAdmin, allAdmins, findAdmin, updateAdmin, deleteAdmin}