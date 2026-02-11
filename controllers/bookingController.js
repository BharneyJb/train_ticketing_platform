const Booking = require("../models/Booking")

let storeBooking = async (req, res) => {
    let booking = new Booking(req.body)
    await booking.add()
    if (booking.id) {
        res.send('Booking saved successfully')
    } else {
        res.send('Unable to save booking')
    }
}

let updateBooking = async (req, res)=>{
    const {id} = req.params;
    let booking = await Booking.findById(id)
    booking.setProp(req.body)
    res.send(await booking.update())
}

let deleteBooking = async (req, res) => {
    const{id} = req.params;    
    res.send(await Booking.delete(id))
}

let findBooking =  async (req, res)=>{
    const {id} = req.params;
    let booking = await Booking.findById(id)
    res.send(booking);
}

let allBookings =  async (req, res)=>{
    let results = await Booking.find()
    res.send(results)
}

module.exports = {storeBooking, allBookings, findBooking, updateBooking, deleteBooking}