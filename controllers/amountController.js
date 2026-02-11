const Amount = require("../models/Amount")

let storeAmount = async (req, res) => {
    let newAmount = new Amount(req.body)
    await newAmount.add()
    if (newAmount.id) {
        res.send('Amount saved successfully')

    } else {
        res.send('Unable to save Amount')
    }
}


let updateAmount = async (req, res)=>{
    const {id} = req.params;
    let existingAmountValue = await Amount.findById(id)
    existingAmountValue.setProp(req.body)
    res.send(await existingAmountValue.update())

}


let deleteAmount = async (req, res) => {
    const { id } = req.params;
    res.send(await Amount.delete(id))
}

let findAmount = async (req, res) => {
    const { id } = req.params;
    let amount = await Amount.findById(id)
    res.send(amount);
}
let allAmounts = async (req, res) => {
    let results = await Amount.find()
    res.send(results)
}

module.exports = {storeAmount, allAmounts, findAmount, updateAmount, deleteAmount}