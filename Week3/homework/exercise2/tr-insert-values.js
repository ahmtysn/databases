const { accounts, changes } = require("./informations");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3"
});

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function insertData() {
  try {
    await connect();
    accounts.forEach(
      async account => await execQuery(`INSERT INTO account SET ?`, account)
    );
    changes.forEach(
      async change =>
        await execQuery(`INSERT INTO account_changes SET ?`, change)
    );
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

insertData();
