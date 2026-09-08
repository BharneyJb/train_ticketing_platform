const Schedule = require("../models/Schedule")
const Coach = require("../models/Coach");
const Fare = require("../models/Fare");
const TravelClass = require("../models/TravelClass");
const Seat = require("../models/Seat");

let storeSchedule = async (req, res) => {
    let schedule = new Schedule(req.body)
    await schedule.add()
    if (schedule.id) {
        res.send('Schedule saved')
    } else {
        res.send('Unable to save schedule')
    }
}

let updateSchedule = async (req, res) => {
    const { id } = req.params;
    let schedule = await Schedule.findById(id)
    schedule.setProp(req.body)
    res.send(await schedule.update())
}

let deleteSchedule = async (req, res) => {
    const { id } = req.params;
    res.send(await Schedule.delete(id))
}

let findSchedule = async (req, res) => {
    const { id } = req.params;
    let schedule = await Schedule.findById(id)
    res.send(schedule);
}

let allSchedules = async (req, res) => {
    let results = await Schedule.find()
    res.send(results)
}

let getSchedulesByRoute = async (req, res) => {
    try {
        const { fromStationId, toStationId } = req.params;
        const { date } = req.query;

        const connection = require("../models/connection");

        let sql = `
            SELECT s.* 
            FROM schedules s
            WHERE s.stationId = ? 
            AND s.departureStation = ?
        `;

        const params = [toStationId, fromStationId];

        // If date parameter is provided, filter by date
        if (date) {
            sql += ` AND DATE(s.departureTime) = DATE(?)`;
            params.push(date);
        }

        const [rows] = await connection.query(sql, params);

        res.send({
            schedules: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('Error fetching schedules by route:', error);
        res.status(500).send({
            error: 'Failed to fetch schedules',
            message: error.message
        });
    }
}

let getScheduleOptions = async (req, res) => {
    try {
        const { id } = req.params;
        const { travelClassId } = req.query;

        if (!travelClassId) {
            return res.status(400).send({
                message: "travelClassId is required"
            });
        }
        const schedule = await Schedule.findById(id);

        if (!schedule) {
            return res.status(404).send({
                message: "Schedule not found"
            });
        }

        const coaches = await Coach.findByIdTrainAndClass(
            schedule.trainId, travelClassId
        );

        for (const coach of coaches) {
            coach.seats = await Seat.findByCoach(coach.id);
        }

        const pricing = await Fare.findWithAmounts();

        const selectedClass = pricing.find(
            itemn => itemn.travelClassId == travelClassId
        );

        if (!selectedClass) {
            return res.status(404).send({
                message: "Travel class pricing not found"
            });
        }

        res.send({
            schedule, travelClass: selectedClass, coaches
        });

    } catch (error) {
        console.error("Error fetchung schedule options:", error);

        res.status(500).send({
            message: "Failed to fetch schedule options",
            error: error.message
        });

    }
}

module.exports = { storeSchedule, allSchedules, findSchedule, updateSchedule, deleteSchedule, getSchedulesByRoute, getScheduleOptions }