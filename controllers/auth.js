const db = require('../config/mysqldb');

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    res.json({
        username: username,
        password: password
    });
}

function allUsers(req, res) {

    var select_q = "SELECT username, email FROM users";
    db.query(select_q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json(data);
    });
}

module.exports = {
    login,
    allUsers
}; 