const mysql = require('mysql2');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mohaned3219',
    database: 'Orders_System'
}).promise()


module.exports = connection;
