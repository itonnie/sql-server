var express = require("express");
var db = require("../bin/db");
var router = express.Router();

router.post("/login", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    db.query("SELECT * FROM users WHERE username='"+ username +"' AND password='" + password + "'", (err, results, fields) => {
        if(err) throw err;
        else if(results == []) {
            res.json({
                ok: false,
                message: "username and password combination incorrect"
            });
        } else {
            res.json({
                ok: true,
                data: results
            });
        }
    });

});

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    db.query("INSERT INTO users(username, password) VALUES('"+username+"','"+password+"')", (err, results, fields) => {
        if(err) {
            if(err.errno == 1062) {
                res.json({
                    ok: false,
                    message: "User already exists, please login."
                });
            }
        } else {
            res.json({
                ok: true,
                data: results,
                message: "Account successfully created",
                f: fields
            });
        }
    });

})

module.exports = router;