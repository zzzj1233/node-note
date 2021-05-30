const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.mysql_host ?? 'localhost',
    user: process.env.db_user ?? 'root',
    password: process.env.db_password ?? '1234',
    database: process.env.db_database,
    waitForConnections: true,
    connectionLimit: process.env.maxSize ?? 2,
    rowsAsArray: false
})

module.exports = pool.promise()
