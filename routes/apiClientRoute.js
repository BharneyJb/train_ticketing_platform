const { Router } = require("express");
const { allCoaches, findCoach } = require("../controllers/coachController");
const { findBooking, storeBooking } = require("../controllers/bookingController");
const { findCustomer, updateCustomer } = require("../controllers/customerController");
const { allSchedules, findSchedule, getSchedulesByRoute } = require("../controllers/scheduleController");
const { findSeat, allSeats } = require("../controllers/seatController");
const { allStations, findStation } = require("../controllers/stationController");
const { allFares, findFare } = require("../controllers/faresController");
const { allBookedSeats, storeBookedSeat } = require("../controllers/bookedSeatController");
const { allTrains, findTrain } = require("../controllers/trainController");
const { findAmount } = require("../controllers/amountController");
const router = Router()
const customerAuth = require("../middleware/customerAuth")

const { customerLogin } = require('../controllers/customerAuthController')
router.route('/login').get((req, res) => { }).post(customerLogin)
router.use(customerAuth);
// coaches routes 

router.get("/coaches", allCoaches);
router.get("/coaches/:id", findCoach);

// booking routes 
router.get("/bookings/:id", findBooking);
router.post("/bookings", storeBooking);

// customer routes 
router.get("/customers", findCustomer);
router.put("/customers", updateCustomer);

// schedule routes
router.get("/schedules/route/:fromStationId/:toStationId", getSchedulesByRoute);
router.get("/schedules", allSchedules);
router.get("/schedules/:id", findSchedule);

// seat routes
router.get("/seats", allSeats);
router.get("/seats/:id", findSeat);

// station routes
router.get("/stations", allStations);
router.get("/stations/:id", findStation);

// fare routes
router.get("/fares", allFares);
router.get("/fares/:id", findFare);

// booked-seat routes
router.get("/booked-seats", allBookedSeats);
router.post("/booked-seats", storeBookedSeat);

// train routes
router.get("/trains", allTrains);
router.get("/trains/:id", findTrain);

// amount routes
router.get("/amounts/:id", findAmount);


module.exports = router;
