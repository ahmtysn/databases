const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup"
});

connection.connect();
const queries = [
  "create table Invitee (invitee_no int, invitee_name varchar(25), invited_by varchar(25))",
  "create table Room (room_no int, room_name varchar(25), floor_number int)",
  "create table Meeting (meeting_no int, meeting_title text, starting_time timestamp, ending_time timestamp, room_no int)"
];

for (let query of queries) {
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results[0]);
  });
}

connection.end();
