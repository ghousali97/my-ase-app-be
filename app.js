const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 4000;
require('dotenv').config();
const initialiseEnv = require('./config/initEnv');
const authRoutes = require("./routes/auth.js");
const postRoutes = require('./routes/posts')

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




    //callback if connection to db fails
    const app = express();

    app.use(express.static("public"));
    app.use(express.json());
    app.use(cors())
    app.use(express.static(path.join(__dirname, 'public')));




    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    });

    const upload = multer({ storage: storage });

    app.use("/api/posts", postRoutes);
    app.use("/api/auth", authRoutes);




    app.listen(port, () => {
        console.log("Server running on port:" + port);
        console.log(process.env.NODE_ENV);
    });

    app.get('/', (req, res) => {
        res.json({
            message: "Hello world!"
        });
    });

}

startApp();