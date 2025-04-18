// SQLite "CRUD functions" example demonstrating creating, updating, reading
// and destroying data...

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("games.db");

db.serialize(function() {

  // create Games table
  db.run("DROP TABLE IF EXISTS Games");
       db.run("CREATE TABLE Games (title TEXT, genre TEXT, platform TEXT, releaseYear INTEGER)");

  // insert records into the employee table
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['The Legend of Zelda: Tears of the Kingdom', 'Action-Adventure', 'Nintendo Switch', '2023']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Hollow Knight', 'Metroidvania', 'PC', '2017']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Super Mario Odyssey', 'Platformer', 'Nintendo Switch', '2017']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['The Witcher 3: Wild Hunt', 'RPG', 'PC', '2015']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Minecraft', 'Sandbox', 'PC', '2011']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Red Dead Redemption 2', 'Action-Adventure', 'PS4', '2018']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Overwatch', 'Shooter', 'PC', '2016']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['The Elder Scrolls V: Skyrim', 'RPG', 'PC', '2011']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Animal Crossing: New Horizons', 'Simulation', 'Nintendo Switch', '2020']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['God of War', 'Action-Adventure', 'PS4', '2018']);
  db.run("INSERT INTO Games VALUES (?,?,?,?)", ['Kingdom Come: Deliverance', 'Action-Adventure', 'PC', '2018']);


//   // select all games to see the table before the changes
//   db.all("SELECT rowid AS id, * FROM Games",
//   	     function(err,results) { console.log(results); });

//   // delete an employee based on the id
//   db.run("DELETE FROM Games WHERE rowid=?",[10],
//          function(err) {console.log(err) });

//   // delete an employee based on the id
//   db.run("DELETE FROM Games WHERE firstname=?",["Kevin"],
//          function(err) {console.log(err) });

//   // delete an employee based on the id
//   db.run("UPDATE Games SET firstname=?,lastname=?,salary=? WHERE rowid=?",
//          ["Larissa","Black","75000",2],
//          function(err) {console.log(err) });

//   // select all Games again to see results after changes
//   db.all("SELECT rowid AS id, * FROM Games",
//          function(err,results) { console.log(results); });

});
