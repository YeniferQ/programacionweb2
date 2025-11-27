require('dotenv').config();

const mysql = require('mysql2/promise');
const { error } = require('console');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.getConnection()
    .then(connection => {
        console.log('Exito en la conexxion');
        connection.release();
    })
    .catch(err => {
        console.error('Fallo la conexion', err);
    });

module.exports = pool;