const mysql = require("mysql");
const util = require("util");
const queries = require("./queries");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

const connect = util.promisify(connection.connect.bind(connection));
const query = util.promisify(connection.query.bind(connection));

async function main() {
  await connect();
  const results = await Promise.all(queries.map(q => query(q.query)));

  queries.forEach((query, index) => {
    console.log(query.description);
    console.table(results[index]);
  });

  connection.end();
}

main();
