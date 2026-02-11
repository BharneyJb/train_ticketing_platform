const Train = require("../models/Train")

let storeTrain = async (req, res) => {
    let train = new Train(req.body)
    await train.add()
    if (train.id) {
        res.send('Train saved')
    } else {
        res.send('Unable to save Train')
    }
}


let updateTrain = async (req, res)=>{
    const {id} = req.params;

    let train = await Train.findById(id)
    train.setProp(req.body)
    res.send(await train.update())
}

let deleteTrain = async (req, res) => {
    const { id } = req.params;
    res.send(await Train.delete(id))
}

let findTrain = async (req, res) => {
    const { id } = req.params;
    let train = await Train.findById(id)
    res.send(train);
}

let allTrains = async (req, res) => {
    let results = await Train.find()
    res.send(results)
}

module.exports = {storeTrain, allTrains, findTrain, updateTrain, deleteTrain}