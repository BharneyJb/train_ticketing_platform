const Model = require("./Model")
const connection = require("./connection")
const Fare = require("./Fare")


class Booking extends Model {

    static async createBooking(data) {

        const conn = connection;

        try {

            // const [testRows] = await conn.execute(
            //     `SELECT id, code, status FROM seats WHERE id = ?`,
            //     [2]
            // );

            // console.log("NODE SEAT TEST:", testRows);
            await conn.beginTransaction();

            //Get Schedule and train
            const [scheduleRows] = await conn.execute(
                `SELECT * FROM schedules WHERE id = ?`,
                [data.scheduleId]
            );

            if (scheduleRows.length === 0) {
                throw new Error("Schedule not found");

            };

            const schedule = scheduleRows[0];

            if (!schedule.trainId) {
                throw new Error("Schedule is not linked to a train");
            }


            const bookingResult = await conn.execute(
                `INSERT INTO bookings
    (date, arrivalTime, departureTime, scheduleId, customerId)
    VALUES (?,?,?,?,?)`,
                [
                    schedule.departureTime,
                    schedule.arrivalTime,
                    schedule.departureTime,
                    data.scheduleId,
                    data.customerId
                ]
            );
            const bookingId = bookingResult[0].insertId;

            const pricing = await Fare.findWithAmounts();

            const selectedClass = pricing.find(
                item => Number(item.travelClassId) === Number(data.travelClassId)
            );

            if (!selectedClass) {
                throw new Error("Travel class pricing not found");
            }

            for (const passenger of data.passengers) {

                //check if seat exists and is available

                const [seatRows] = await conn.execute(
                    `SELECT s.*, c.trainId, c.travelClassId
                    FROM seats s
                    INNER JOIN coaches c ON s.coachId = c.id
                    WHERE s.id = ?
                    FOR UPDATE`,
                    [passenger.seatId]
                );

                if (seatRows.length === 0) {
                    throw new Error(
                        `Seat ${passenger.seatId} does not exist`
                    );
                }

                const seat = seatRows[0];

                if (seat.status !== "Available") {
                    throw new Error(
                        `Seat ${passenger.seatId} is not available`
                    );
                }

                //seat must belong to the same train as the schedule
                if (seat.trainId !== schedule.trainId) {
                    throw new Error(
                        `Seat ${passenger.seatId} does not belong to this train`
                    );
                }

                if (
                    data.travelClassId &&
                    Number(seat.travelClassId) !== Number(data.travelClassId)
                ) {
                    throw new Error(
                        `Seat ${passenger.seatId} doesn't belong to the selected travel class `
                    );
                }

                await conn.execute(
                    `
                    INSERT INTO bookedSeats
                    (
                    bookingId, seatId, passengerType, phone, email, nin, amount
                    )
                    VALUES (?,?,?,?,?,?,?)
                    `,
                    [
                        bookingId,
                        passenger.seatId,
                        passenger.passengerType,
                        passenger.phone || null,
                        passenger.email || null,
                        passenger.nin || null,
                        passenger.passengerType === "Adult"
                            ? selectedClass.adultAmount
                            : selectedClass.childAmount
                    ]
                );

                await conn.execute(
                    `
                    UPDATE seats 
                    SET status = 'Unavailable'
                    WHERE id = ? 
                    `,
                    [passenger.seatId]
                );
            }

            await conn.commit();
            return bookingId;


        } catch (error) {
            await conn.rollback();
            throw error;

        }

        finally {

        }
    }
}





module.exports = Booking