const Model = require("./Model")
const connection = require("./connection")

class Seat extends Model {

    static async findByCoach(coachId) {
        const sql = `SELECT * FROM seats WHERE coachId = ? ORDER BY id`;

        const [rows] = await connection.query(sql, [coachId]);
        return rows;
    }

}

module.exports = Seat