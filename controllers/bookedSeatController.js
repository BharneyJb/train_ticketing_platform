const BookedSeat = require("../models/bookedSeat.js")

let storeBookedSeat = async (req, res) => {
    let bookedSeat = new BookedSeat(req.body)
    await bookedSeat.add()
    if (bookedSeat.id) {
        res.send('bookedSeat saved successfully')
    } else {
        res.send('Unable to save bookedSeat')
    }
}

let updateBookedSeat = async (req, res) => {
    const { id } = req.params;
    let bookedSeat = await BookedSeat.findById(id)
    bookedSeat.setProp(req.body)
    res.send(await bookedSeat.update())
}

let deleteBookedSeat = async (req, res) => {
    const { id } = req.params;
    res.send(await BookedSeat.delete(id))
}

let findBookedSeat = async (req, res) => {
    const { id } = req.params;
    let bookedSeat = await BookedSeat.findById(id)
    res.send(bookedSeat);
}

let allBookedSeats = async (req, res) => {
    let results = await BookedSeat.find()
    res.send(results)
}

module.exports = { storeBookedSeat, allBookedSeats, findBookedSeat, updateBookedSeat, deleteBookedSeat }