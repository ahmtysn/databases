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

const CREATE_AUTHORS_TABLE = `
  CREATE TABLE IF NOT EXISTS authors(
    author_no INT PRIMARY KEY, 
    author_name VARCHAR(50), 
    university VARCHAR(50), 
    date_of_birth DATE, 
    h_index INT, 
    gender ENUM('f','m'))`;

const fk_friend = `ALTER TABLE authors
ADD COLUMN friend INT,
ADD CONSTRAINT FOREIGN KEY(friend) references authors(author_no);
`;
function randomID() {
  return 101 + Math.floor(Math.random() * 14);
}

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  try {
    await connect();
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(fk_friend);
    const data = await readFile(path.join(__dirname, "authors.json"), "utf8");
    const authors = JSON.parse(data);
    const promises = authors.map(author =>
      execQuery(`INSERT INTO authors SET ?`, author)
    );
    await Promise.all(promises);
    const updatePromises = authors.map(author =>
      execQuery(
        `UPDATE authors SET friend = ${randomID()} WHERE author_no = ${
          author.author_no
        }`
      )
    );
    await Promise.all(updatePromises);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

seedDatabase();
