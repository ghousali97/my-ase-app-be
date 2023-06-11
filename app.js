const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
require('dotenv').config();
const initialiseEnv = require('./config/initEnv');

async function startApp() {
    await initialiseEnv();

    const db = require('./config/mysql');
    db.connect((err) => {
        if (err) {
            console.log("connection to database failed!");
            console.log(err);
        } else {
            console.log("connected to database!");
        }
    });



    const authRoutes = require("./routes/auth.js");

    //callback if connection to db fails
    const app = express();
    //set public directory for your application
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.json());

    app.use("/api/auth", authRoutes);




    app.listen(port, () => {
        console.log("Server running on port:" + port);
        console.log(process.env.NODE_ENV);
    });

}

startApp();