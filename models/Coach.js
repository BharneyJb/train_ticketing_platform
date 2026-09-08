const Model = require("./Model")
const connection = require("./connection")

class Coach extends Model {
    static async findByIdTrainAndClass(trainId, travelClassId) {
        const sql = `SELECT * FROM  coaches
                                WHERE trainId = ?
                                AND travelClassId = ?
                                ORDER BY id
                        `;

        const [rows] = await connection.query(sql, [
            trainId, travelClassId
        ]);

        return rows;
    }


}




module.exports = Coach