const mysql = require('mysql');

let appDb = {};

appDb.pool = mysql.createPool({
    connectionLimit: 50,
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});

module.exports = appDb;