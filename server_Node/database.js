const mysql = require('mysql2');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Seif@2004',
    database: 'Orders_System'
}).promise()

connection.getConnection()
    .then(() => {
        console.log('Database connection successful!');
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });

module.exports = connection;
