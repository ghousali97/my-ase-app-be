const db = require('../config/mysql');
const { getSecret } = require('../config/keyvault');

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    res.json({
        username: username,
        password: password
    });
}

function allUsers(req, res) {
    console.log("user triggered!");
    console.log(db);
    var select_q = "SELECT username, email FROM users";
    db.query(select_q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json(data);
    });
}

function getSecretFromKv(req, res) {

    getSecret('dbuser', 'my-gak-kv-1').then((secret) => {
        res.json({ secret: secret });
    });

}

module.exports = {
    login,
    allUsers,
    getSecretFromKv
}; 