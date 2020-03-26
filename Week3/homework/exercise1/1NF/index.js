const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3"
});

const CREATE_1NF_TABLE = `CREATE TABLE IF NOT EXISTS 1NF ( 
  index_no int NOT NULL AUTO_INCREMENT, 
  member_id int,
  member_name varchar(50), 
  member_address varchar(50), 
  dinner_id varchar(50),
  dinner_date DATE, 
  venue_code varchar(50), 
  venue_description varchar(50),
  food_code varchar(50), 
  food_description varchar(50),
  CONSTRAINT PK_1NF PRIMARY KEY(index_no)
  )`;

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  try {
    await connect();
    await execQuery(CREATE_1NF_TABLE);

    const data = await readFile(
      path.join(__dirname, "dinnerClub.json"),
      "utf8"
    );
    const members = JSON.parse(data);
    const promises = members.map(member =>
      execQuery(`INSERT INTO 1NF SET ?`, member)
    );
    await Promise.all(promises);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

seedDatabase();
