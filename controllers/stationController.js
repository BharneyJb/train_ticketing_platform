const Station = require("../models/Station.js")


let storeStation = async (req, res) => {
    let station = new Station(req.body)
    await station.add()
    if (station.id) {
        res.send('station saved successfully')
    } else {
        res.send('Unable to save station')
    }
}

let updateStation = async (req, res)=>{
    const {id} = req.params;
    let station = await Station.findById(id)
    station.setProp(req.body)
    
    res.send(await station.update())
}

let deleteStation = async (req, res) => {
    const{id} = req.params;    
    res.send(await Station.delete(id))
}

let findStation =  async (req, res)=>{
    const {id} = req.params;
    let station = await Station.findById(id)
    res.send(station);
}

let allStations =  async (req, res)=>{
    let results = await Station.find()
    res.send(results)
}

module.exports = {storeStation, allStations, findStation, updateStation, deleteStation}