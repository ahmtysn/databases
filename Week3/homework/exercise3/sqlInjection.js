const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

connection.connect(err => {
  if (err) console.err(err.message);
  else console.log("Connected...");
});

function getPopulation(Country, name, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = ?`,
    name,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}

getPopulation("country", "Angola", (err, result) => {
  if (err) console.error(err.message);
  else console.log("Result: ", result);
});
