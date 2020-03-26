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

async function transaction(fromAccount, toAccount, amount) {
  try {
    await connect();
    await execQuery(`start transaction`);
    const balanceOf101 = await execQuery(
      `select balance from account where account_number = ${fromAccount}`
    );

    if (balanceOf101[0].balance < amount) {
      await execQuery(`rollback`);
      return;
    }
    const balanceOf102 = await execQuery(
      `select balance from account where account_number = ${toAccount}`
    );
    await execQuery(
      `update account set balance = ${balanceOf101[0].balance -
        amount} where account_number = ${fromAccount}`
    );
    await execQuery(
      `update account set balance = ${balanceOf102[0].balance +
        amount} where account_number = ${toAccount}`
    );
    await execQuery(`commit`);
    connection.end();
  } catch (err) {
    console.error(err);
    connection.end();
  }
}

transaction(101, 102, 1000);
