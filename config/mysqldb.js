const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();



//pulls connection parameter from .env file for local environment and application
//setting for ASE production.
var connectionParams = {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: {
        rejectUnauthorized: false

    }
};


//create a connection object. We need to use .connect method on connect
//to establish connection with the database.
var db = mysql.createConnection(connectionParams);

module.exports = db;