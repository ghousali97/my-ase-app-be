const express = require('express');
const path = require('path');
const db = require('./config/mysqldb');
const port = process.env.PORT || 4000;
require('dotenv').config();


const authRoutes = require("./routes/auth.js");

//callback if connection to db fails
db.connect((err) => {
    if (err) {
        console.log("connection to database failed!");
        console.log(err);
    } else {
        console.log("connected to database!");
    }
});


const app = express();

//set public directory for your application
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.use("/api/auth", authRoutes);




app.listen(port, () => {
    console.log("Server running on port:" + port);
    console.log(process.env.NODE_ENV);
});



app.get("/", (req, res) => {

    //Environment variables need to be set in application settings on Azure portal.
    res.json({
        message: "Hello world!\n This is " + process.env.NODE_ENV
    });
});



