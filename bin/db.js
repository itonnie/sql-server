var mysql = require("mysql");

var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "contactapp"
});

db.connect((err) => {
    if(err) {
      console.log("error connecting to the database");
      console.log(err);
    } else {
      console.log("Connection established");
    }
});

module.exports = db;