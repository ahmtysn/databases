const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup"
});

connection.connect();
const queriesInvite = [
  "insert into Invitee values (101,'Birthday Party','Inna Golita')",
  "insert into Invitee values (102,'Summer Party','Selena Gomez')",
  "insert into Invitee values (103,'Wedding Party','My Best Friend')",
  "insert into Invitee values (104,'Meetup Organization','Alexander Delgado')",
  "insert into Invitee values (105,'Rock Concert','Rick Martin')"
];
const queriesRoom = [
  "insert into Room values (201,'King Room',5)",
  "insert into Room values (202,'Ordinary Room',1)",
  "insert into Room values (203,'New Married Room',2)",
  "insert into Room values (204,'Cave Suit Room',4)",
  "insert into Room values (205,'Ultra Delux Room',6)"
];
const queriesMeeting = [
  "insert into Meeting values (301,'Practice Your Dutch','2020-03-15 09:00','2020-03-15 11:00',3)",
  "insert into Meeting values (302,'Free Walking Tours','2020-04-05 19:00','2020-04-05 21:00',2)",
  "insert into Meeting values (303,'Amsterdam Business Breakfast','2020-03-25 11:00','2020-03-25 13:00',1)",
  "insert into Meeting values (304,'Block-Chain Amsterdam','2020-03-19 09:30','2020-03-19 12:30',5)",
  "insert into Meeting values (305,'Programming Discussion','2020-03-30 16:00','2020-03-30 18:00',6)"
];

const allQueries = [queriesInvite, queriesRoom, queriesMeeting];

allQueries.forEach(queries => {
  queries.forEach(query => {
    connection.query(query, function(error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results[0]);
    });
  });
});

connection.end();
