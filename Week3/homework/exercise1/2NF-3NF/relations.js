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

const CREATE_MEMBERS_TABLE = `
  CREATE TABLE IF NOT EXISTS members(
    member_id INT PRIMARY KEY, 
    member_name VARCHAR(50), 
    member_address VARCHAR(50)
    )`;

const CREATE_DINNERS_TABLE = `
    CREATE TABLE IF NOT EXISTS dinners(
      dinner_id VARCHAR(50) PRIMARY KEY, 
      dinner_date DATE, 
      venue_code VARCHAR(50), 
      venue_description VARCHAR(50)
      )`;

const CREATE_FOODS_TABLE = `
  CREATE TABLE IF NOT EXISTS foods(
    food_id INT PRIMARY KEY, 
    food_code VARCHAR(50), 
    food_description VARCHAR(50)
    )`;

const CREATE_RELATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS relations(
  member_id int, 
  dinner_id VARCHAR(50),
  food_id int,
  CONSTRAINT FOREIGN KEY(member_id) REFERENCES members(member_id),
  CONSTRAINT FOREIGN KEY(dinner_id) REFERENCES dinners(dinner_id),
  CONSTRAINT FOREIGN KEY(food_id) REFERENCES foods(food_id),
  CONSTRAINT PRIMARY KEY(member_id, dinner_id, food_id) )`;

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);

async function seedDatabase() {
  try {
    await connect();
    await execQuery(CREATE_MEMBERS_TABLE);
    await execQuery(CREATE_DINNERS_TABLE);
    await execQuery(CREATE_FOODS_TABLE);
    await execQuery(CREATE_RELATIONS_TABLE);

    const dataMembers = await readFile(
      path.join(__dirname, "members.json"),
      "utf8"
    );
    const members = JSON.parse(dataMembers);
    const memberPromises = members.map(member =>
      execQuery(`INSERT INTO members SET ?`, member)
    );

    const dataDinners = await readFile(
      path.join(__dirname, "dinners.json"),
      "utf8"
    );
    const dinners = JSON.parse(dataDinners);
    const dinnerPromises = dinners.map(dinner =>
      execQuery(`INSERT INTO dinners SET ?`, dinner)
    );

    const dataFoods = await readFile(
      path.join(__dirname, "foods.json"),
      "utf8"
    );
    const foods = JSON.parse(dataFoods);
    const foodPromises = foods.map(food =>
      execQuery(`INSERT INTO foods SET ?`, food)
    );

    const dataRelations = await readFile(
      path.join(__dirname, "relations.json"),
      "utf8"
    );
    const relations = JSON.parse(dataRelations);
    const relationPromises = relations.map(relation =>
      execQuery(`INSERT INTO relations SET ?`, relation)
    );

    await Promise.all(
      memberPromises,
      dinnerPromises,
      foodPromises,
      relationPromises
    );
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

seedDatabase();
