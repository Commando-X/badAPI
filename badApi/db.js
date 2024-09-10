// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'badapi_user',
  password: 'your_secure_password', //coming back here
  database: 'badapi_db'
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
