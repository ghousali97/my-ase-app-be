const express = require('express');
const port = process.env.PORT || 4000;


const authRoutes = require("./routes/auth.js");



const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);


app.listen(port, () => {
    console.log("Server running on port:" + port);
});


app.get("/", (req, res) => {
    res.json({
        message: "Hello world!"
    });
});





