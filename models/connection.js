const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'train_ticketing',
}).promise()