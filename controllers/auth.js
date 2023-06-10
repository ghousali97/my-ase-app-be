

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    res.json({
        username: username,
        password: password
    });
}


module.exports.login = login; 