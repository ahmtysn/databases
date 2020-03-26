const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb"
});

const namesFriends = `SELECT A1.author_name AS Authors, A2.author_name AS Friends 
FROM authors AS A1
LEFT JOIN authors AS A2
on A2.author_no = A1.friend`;

const authorsTitles = `SELECT A.author_name AS Names, P.paper_title AS Titles
FROM authors AS A
LEFT JOIN relations AS R
ON A.author_no = R.author_id
LEFT JOIN papers AS P
ON R.paper_id = P.paper_id`;

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  try {
    await connect();
    const friends = await execQuery(namesFriends);
    console.table(friends);
    const titles = await execQuery(authorsTitles);
    console.table(titles);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}
seedDatabase();
