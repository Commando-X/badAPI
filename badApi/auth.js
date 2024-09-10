// auth.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Import database connection

// Endpoint for user authentication
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.json({ message: 'Login successful', user: results[0] });
  });
});

module.exports = router;
