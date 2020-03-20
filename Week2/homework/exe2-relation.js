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

const CREATE_PAPERS_TABLE = `
  CREATE TABLE IF NOT EXISTS papers(
    paper_id INT PRIMARY KEY, 
    paper_title VARCHAR(50), 
    conference VARCHAR(50), 
    publish_date DATE
    )`;

const CREATE_RELATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS relations(
  author_id int, 
  paper_id int,
  CONSTRAINT FOREIGN KEY(author_id) REFERENCES authors(author_no),
  CONSTRAINT FOREIGN KEY(paper_id) REFERENCES papers(paper_id),
  CONSTRAINT PRIMARY KEY(author_id, paper_id) )`;

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  try {
    await connect();
    await execQuery(CREATE_PAPERS_TABLE);
    await execQuery(CREATE_RELATIONS_TABLE);

    const dataPapers = await readFile(
      path.join(__dirname, "papers.json"),
      "utf8"
    );
    const papers = JSON.parse(dataPapers);
    const paperPromises = papers.map(paper =>
      execQuery(`INSERT INTO papers SET ?`, paper)
    );

    const dataRelations = await readFile(
      path.join(__dirname, "relations.json"),
      "utf8"
    );
    const relations = JSON.parse(dataRelations);
    const relationPromises = relations.map(relation =>
      execQuery(`INSERT INTo relations SET ?`, relation)
    );
    await Promise.all(relationPromises, paperPromises);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

seedDatabase();
