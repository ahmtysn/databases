const {
  numOfAuthorsOnResearch,
  femaleResearchers,
  avgH_index,
  sumPapersPerUniversities,
  minAndMaxH_Index
} = require("./queries");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb"
});

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  await connect();
  try {
    console.table(await execQuery(numOfAuthorsOnResearch));
    console.table(await execQuery(femaleResearchers));
    console.table(await execQuery(avgH_index));
    console.table(await execQuery(sumPapersPerUniversities));
    console.table(await execQuery(minAndMaxH_Index));
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}
seedDatabase();
