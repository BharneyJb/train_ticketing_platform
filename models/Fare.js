const Model = require("./Model")
const connection = require("./connection")
class Fare extends Model {
    static async findWithAmounts() {
        const sql = `
                        SELECT
                        tc.id AS travelClassId,
                        tc.name AS travelClass,

                        MAX(
                            CASE 
                                WHEN f.passengerType = 'Adult' 
                                THEN A.amount
                         END
                        ) AS adultAmount,

                        MAX(
                        CASE 
                            WHEN f.passengerType = 'Child'
                            THEN a.amount
                        END    
    ) AS childAmount

    FROM  fares f

    INNER JOIN travelClasses tc ON f.travelClassId = tc.id

    INNER JOIN amounts a ON  f.amountId = a.id

    GROUP BY tc.id, tc.name 
    ORDER BY tc.id

                `;
        const [rows] = await connection.query(sql)
        return rows;
    }
}


module.exports = Fare