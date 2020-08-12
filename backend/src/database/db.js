const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       complement TEXT,
//       country TEXT,
//       region TEXT,
//       city TEXT,
//       latitude TEXT,
//       longitude TEXT,
//       items TEXT
//     );
//   `);

//   const query = `
//   INSERT INTO places (
//     name,
//     image,
//     address,
//     complement,
//     country,
//     region,
//     city,
//     latitude,
//     longitude,
//     items
//   ) VALUES (?,?,?,?,?,?,?,?,?,?);`;

//   const values = [
//     "Papersider", 
//     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "Tadeusza Kościuszki",
//     "12",
//     "Poland",
//     "Pomorskie",
//     "Malbork",
//     "54.0370511",
//     "19.0328097",
//     "Lamps, Papers and Cardboards"
//   ];

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("Successfully created!");
//     console.log(this);
//   }

//   db.run(query, values, afterInsertData);

 
//   db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(this);
//   });

//   db.all(`SELECT * FROM places`, function (err, rows) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(rows);
//   });

// });
