// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ghost',
  password: 'ghost_sec', //coming back here
  database: 'badapi_db2'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;
