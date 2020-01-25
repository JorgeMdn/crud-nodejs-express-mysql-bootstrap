const mysql = require('mysql');
// el modulo mysql no acepta promesas asi que utilizamos promisify para convertir callbacks a promesas 
const { promisify } = require('util');
const { database } = require('./keys'); // Keys para la db, user, pass,server 

// createPool() = tiene una especie de hilos que se van ejecutando y cada uno lo hace una a la vez
const pool = mysql.createPool(database); // coneccion a la db

// esto se hace para no estarse conectado cada vez que se utiliza
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) {
        connection.release();
        console.log('DB is Connected');
        return;
    }

});

// Promisify pool querys
pool.query = promisify(pool.query)

module.exports = pool; * /*