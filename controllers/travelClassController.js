const TravelClass = require("../models/TravelClass")

let storeTravelClass = async (req, res) => {
    let travelClass = new TravelClass(req.body)
    await travelClass.add()
    if (travelClass.id) {
        res.send('TravelClass saved')
    } else {
        res.send('Unable to save TravelClass')
    }
}

let updateTravelClass = async (req, res)=>{
    const {id} = req.params;

    let travelClass = await TravelClass.findById(id)
    travelClass.setProp(req.body)
    res.send(await travelClass.update())
}

let deleteTravelClass = async (req, res) => {
    const{id} = req.params;    
    res.send(await TravelClass.delete(id))
}

let findTravelClass = async (req, res) => {
    const { id } = req.params;
    let travelClass= await TravelClass.findById(id)
    res.send(travelClass);
}

let allTravelClasses = async (req, res) => {
    let results = await TravelClass.find()
    res.send(results)
}


module.exports = {storeTravelClass, allTravelClasses, findTravelClass, updateTravelClass, deleteTravelClass}