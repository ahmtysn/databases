const mysql = require("mysql");
const util = require("util");
const {
  numOfAuthorsOnResearch,
  femaleResearchers,
  avgH_index,
  sumPapersPerUniversities,
  minAndMaxH_Index,
  queries
} = require("./queries");

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
    queries.forEach(async query => console.table(await execQuery(query)));
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}
seedDatabase();
