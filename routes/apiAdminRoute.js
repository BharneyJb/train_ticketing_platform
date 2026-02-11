const auth = require('../middleware/auth')
const {Router} = require('express');
const router = Router();
const { allCoaches, storeCoach, findCoach, updateCoach, deleteCoach } = require('../controllers/coachController');
const { allBookings, storeBooking, findBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { allCustomers, storeCustomer, findCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { allSchedules, storeSchedule, findSchedule, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const { allSeats, storeSeat, findSeat, updateSeat, deleteSeat } = require('../controllers/seatController');
const { allStations, storeStation, findStation, updateStation, deleteStation } = require('../controllers/stationController');
const { storeFare, allFares, findFare, updateFare, deleteFare } = require('../controllers/faresController');
const { allBookedSeats, storeBookedSeat, findBookedSeat, updateBookedSeat, deleteBookedSeat } = require('../controllers/bookedSeatController');
const { allTrains, storeTrain, findTrain, updateTrain, deleteTrain } = require('../controllers/trainController');
const { allAmounts, storeAmount, findAmount, updateAmount, deleteAmount } = require('../controllers/amountController');
const { allTravelClasses, storeTravelClass, findTravelClass, updateTravelClass, deleteTravelClass } = require('../controllers/travelClassController');
const { allAdmins, storeAdmin, findAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const customerValidator = require('../validators/customerValidator');
const stationValidator = require('../validators/stationValidator');
const fareValidator = require('../validators/fareValidator');
const bookedSeatValidator = require('../validators/bookedSeatValidator');
const scheduleValidator = require('../validators/scheduleValidator');
const seatValidator = require('../validators/seatValidator');
const bookingValidator = require('../validators/bookingValidator');
const coachValidator = require('../validators/coachValidator');
const {login} = require('../controllers/authcontroller');


router.route('/login').get((req, res)=>{}).post(login)
router.use(auth);




// Coach route
router.route('/coaches').get(allCoaches).post(coachValidator, storeCoach)
router.route('/coaches/:id').get(findCoach).put(updateCoach).delete(deleteCoach)

//Booking route
router.route('/bookings').get(allBookings).post(bookingValidator, storeBooking)
router.route('/bookings/:id').get(findBooking).put(updateBooking).delete(deleteBooking)


//Customer route

router.route('/customers').get(allCustomers).post(customerValidator ,storeCustomer)
router.route('/customers/:id').get(findCustomer).put(customerValidator,updateCustomer).delete(deleteCustomer)


//Schedule route
router.route('/schedules').get(allSchedules).post(scheduleValidator,storeSchedule)
router.route('/schedules/:id').get(findSchedule).put(scheduleValidator,updateSchedule).delete(deleteSchedule)

//Seat route
router.route('/seats').get(allSeats).post(seatValidator,storeSeat)
router.route('/seats/:id').get(findSeat).put(seatValidator,updateSeat).delete(deleteSeat)

router.get('/', (req, res) => res.send('Hello Swift Rails!'))
router.get('/', (req, res) => res.send(`Welcome, ${req.admin.name}`))


//stations route
router.route('/stations').get(allStations).post(stationValidator, storeStation)
router.route('/stations/:id').get(findStation).put(updateStation).delete(deleteStation)

//fares route
router.route('/fares').get(allFares).post(fareValidator, storeFare)
router.route('/fares/:id').get(findFare).put(updateFare).delete(deleteFare)


//bookedSeats route
router.route('/booked-seats').get(allBookedSeats).post(bookedSeatValidator, storeBookedSeat)
router.route('/booked-seats/:id').get(findBookedSeat).put(updateBookedSeat).delete(deleteBookedSeat)

//trains route
router.route('/trains').get(allTrains).post(storeTrain)
router.route('/trains/:id').get(findTrain).put(updateTrain).delete(deleteTrain)

//travelclasses route
router.route('/travelclasses').get(allTravelClasses).post(storeTravelClass)
router.route('/travelclasses/:id').get(findTravelClass).put(updateTravelClass).delete(deleteTravelClass)

//Amount route
router.route('/amounts').get(allAmounts).post(storeAmount)
router.route('/amounts/:id').get(findAmount).put(updateAmount).delete(deleteAmount)

// Admin route
router.route('/login').get((req, res)=>{}).post(login)
router.route('/admins').get(allAdmins).post(storeAdmin)
router.route('/admins/:id').get(findAdmin).put(updateAdmin).delete(deleteAdmin)


//travelClasses route
router.route('/travel-class').get(allTravelClasses).post(storeTravelClass)
router.route('/travel-class/:id').get(findTravelClass).put(updateTravelClass).delete(deleteTravelClass)


router.route('/admins').get(allAdmins).post(storeAdmin)
router.route('/admins/:id').get(findAdmin).put(updateAdmin).delete(deleteAdmin)

//TravelClass route
router.route('/travel-class').get(allTravelClasses).post(storeTravelClass)
router.route('/travel-class/:id').get(findTravelClass).put(updateTravelClass).delete(deleteTravelClass)


//trains route
router.route('/trains').get(allTrains).post(storeTrain)
router.route('/trains/:id').get(findTrain).put(updateTrain).delete(deleteTrain)


//Amount route
router.route('/amount').get(allAmounts).post(storeAmount)
router.route('/amount/:id').get(findAmount).put(updateAmount).delete(deleteAmount)


module.exports = router
// ("http://localhost:3000/admin/bookings")