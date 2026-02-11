const connection = require("./connection")
const pluralize = require('pluralize')


class Model {
    constructor(props = {}) {
        this.setProp(props)
    }


    setProp(props = {}) {

        for (const key in props) {
            this[key] = props[key]
        }
    }

    static get tableName() {
        return pluralize(this.name)
    }

    static async find() {
        let results = []
        let sql = `SELECT * FROM ${this.tableName}`
        const [rows] = await connection.query(sql)

        for (const row of rows) {
            results.push(new this(row))
        }
        return results
    }

    static async findById(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
        const [rows, fields] = await connection.execute(sql, [id])
        let row = rows[0] || null;
        if (row != null) {
            return new this(row)
        }
        return null
    }


    static async delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ?`
        const [results, fields] = await connection.execute(sql, [id])
        return results.affectedRows > 0
    }

    async add() {
        let columns = Object.keys(this).join(', ');
        let placeholders = '?'.repeat(Object.keys(this).length).split('').join(', ')

        let sql = `INSERT INTO ${this.constructor.tableName} (${columns}) VALUES (${placeholders}) `

        const [results, fields] = await connection.execute(sql, Object.values(this));
        if (results.insertId > 0) {
            this.id = results.insertId;
            return this;

        }
        return false;
    }

    async update() {
        let { id, createdAt, updatedAt, ...others } = this

        let sql = `UPDATE ${this.constructor.tableName} SET ${Object.keys(others).join(' = ?, ') + ' = ? '} WHERE id = ?`
        const [results, fields] = await connection.execute(sql, [...(Object.values(others)), id])
        return results.affectedRows > 0
    }

    async delete() {

        let sql = `DELETE FROM ${this.tableName} WHERE id = ? `

        const [results, fields] = await connection.execute(sql, [this.id])
        return results.affectedRows > 0
    }

}

module.exports = Model


