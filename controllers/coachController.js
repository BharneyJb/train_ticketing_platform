const Coach = require("../models/Coach")

let storeCoach = async (req, res) => {
    let coach = new Coach(req.body)
    await coach.add()
    if (coach.id) {
        res.send('Coach saved successfully')
    } else {
        res.send('Unable to save coach')
    }
}

let updateCoach = async (req, res)=>{
    const {id} = req.params;
    let coach = await Coach.findById(id)
    coach.setProp(req.body)
    res.send(await coach.update())
}

let deleteCoach = async (req, res) => {
    const{id} = req.params;    
    res.send(await Coach.delete(id))
}

let findCoach =  async (req, res)=>{
    const {id} = req.params;
    let coach = await Coach.findById(id)
    res.send(coach);
}

let allCoaches =  async (req, res)=>{
    let results = await Coach.find()
    res.send(results)
}

module.exports = {storeCoach, allCoaches, findCoach, updateCoach, deleteCoach}