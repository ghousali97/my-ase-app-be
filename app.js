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







app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "DEVPMENT" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



