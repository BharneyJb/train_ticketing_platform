const Model = require("./Model");
const connection = require("./connection")
const bcrypt = require('bcrypt');

class Admin extends Model {
    static async findByEmail(email) {
        let sql = `SELECT * FROM ${this.tableName} WHERE email = ?`
        const [rows, fields] = await connection.execute(sql, [email])
        let row = rows[0] || null;
        if(row != null) {
            return new this(row)
        }
        return null
    }

    static async login (email, password) {
        let admin = await this.findByEmail(email)
        if (admin != null) {
            if (bcrypt.compareSync(password, admin.password)) {
                return admin
            }
        }
        return null
    }
    

}

module.exports = Admin