const express = require('express');
const router = express.Router();
const db = require('./db'); // Import database connection

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the database if the username does not already exist.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */

// Endpoint for registering a new user
router.post('/', (req, res) => {
  const { username, password, role } = req.body;

  // Check if username already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert new user
    const insertUserQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [username, password, role], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
});

module.exports = router;
