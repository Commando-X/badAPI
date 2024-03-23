const express = require('express');
const router = express.Router();

// Hardcoded credentials (vulnerable to Broken Authentication)
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Endpoint for user authentication (vulnerable to Injection)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ message: 'Login successful', user });
});

module.exports = router;
