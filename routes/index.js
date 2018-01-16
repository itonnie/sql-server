var express = require('express');
var db = require("../bin/db");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post("/addcontact", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var holder = req.body.holder;

  db.query("INSERT INTO contacts(name, email, number, holdername) VALUES('"+name+"','"+email+"','"+phone+"','"+holder+"')", (err, result) => {
    if(err) throw err;
    else {
      res.json({
        ok: true,
        message: "Contact successfully added",
        id: result.insertId
      });
    }
  });
});

router.post("/delete", (req, res, next) => {
  var id = req.body.id;
  var holder = req.body.holder;

  db.query("DELETE FROM contacts WHERE id="+id+"", (err, result) => {
    if(err) throw err;
    else {
      db.query("SELECT * FROM contacts WHERE holdername='"+holder+"'", (err, data) => {
        if(err) throw err;
        else {
          res.json({
            ok: true,
            data: data
          });
        }
      });
    }
  });
});

router.get("/contacts/:username", (req, res, next) => {
  var username = req.params.username;

  db.query("SELECT * FROM `contacts` WHERE holdername = '"+username+"'", (err, results, fields) => {
    if(err) {
      console.log(err);
    } else {
      res.json({
        ok: true,
        data: results,
        f: fields
      })
    }
  })
})

module.exports = router;
