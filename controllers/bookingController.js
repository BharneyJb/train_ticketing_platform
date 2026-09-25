const Booking = require("../models/Booking")

let storeBooking = async (req, res) => {
    try {
        const customerId = req.customer.id;

        const bookingId = await Booking.createBooking({
            ...req.body,
            customerId
        });

        res.status(201).json({
            message: "Booking created successfully",
            bookingId
        });
    } catch (error) {
        console.error("Error creating booking:", error);

        res.status(400).json({
            message: error.message
        });
    }
}

let updateBooking = async (req, res) => {
    const { id } = req.params;
    let booking = await Booking.findById(id)
    booking.setProp(req.body)
    res.send(await booking.update())
}

let deleteBooking = async (req, res) => {
    const { id } = req.params;
    res.send(await Booking.delete(id))
}

let findBooking = async (req, res) => {
    const { id } = req.params;
    let booking = await Booking.findById(id)
    res.send(booking);
}

let allBookings = async (req, res) => {
    try {
        const customerId = req.customer.id;
        let results = await Booking.findByCustomerId(customerId);
        res.send(results);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { storeBooking, allBookings, findBooking, updateBooking, deleteBooking }