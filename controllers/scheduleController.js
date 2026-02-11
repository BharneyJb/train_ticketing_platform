const Schedule = require("../models/Schedule")

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

        // Query to find schedules between two stations
        // This assumes schedules table might need to be joined with other tables
        // Adjust the query based on your actual database structure
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

module.exports = { storeSchedule, allSchedules, findSchedule, updateSchedule, deleteSchedule, getSchedulesByRoute }