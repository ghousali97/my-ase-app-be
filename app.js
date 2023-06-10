const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
require('dotenv').config();


const authRoutes = require("./routes/auth.js");



const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.use("/api/auth", authRoutes);


app.listen(port, () => {
    console.log("Server running on port:" + port);
    console.log(process.env.ENVIRONMENT);
});


app.get("/", (req, res) => {
    res.json({
        message: "Hello world!"
    });
});



