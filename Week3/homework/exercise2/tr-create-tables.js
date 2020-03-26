const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3"
});

const CREATE_account_TABLE = `
  CREATE TABLE IF NOT EXISTS account(
    account_number INT PRIMARY KEY, 
    balance INT
    )`;

const CREATE_account_changes_TABLE = `
  CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT PRIMARY KEY, 
    account_number INT, 
    amount INT,
    changed_date DATE,
    remark ENUM('y','n'),
    CONSTRAINT FK_Account FOREIGN KEY(account_number) REFERENCES account(account_number)
    )`;

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  try {
    await connect();
    await execQuery(CREATE_account_TABLE);
    await execQuery(CREATE_account_changes_TABLE);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

seedDatabase();
