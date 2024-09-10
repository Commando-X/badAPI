// account.js
const express = require('express');
const router = express.Router();

// In-memory database for storing user information (including sensitive data)
const usersInfo = [
  { username: 'user1', dob: '1990-01-01', address: '5, 3rd mainland Bridge', cardInfo: '1234-5678-9012-3456', children: ['Child1', 'Child2'], balance: 1000, role: 'user' },
  { username: 'user2', dob: '1985-05-15', address: '7, Ghost street', cardInfo: '9876-5432-1098-7654', children: ['Child3'], balance: 500, role: 'user' },
];

// Endpoint for getting user account information (vulnerable to Excessive Data Exposure and IDOR)
router.get('/info/:username', (req, res) => {
  const { username } = req.params;
  const userInfo = usersInfo.find(user => user.username === username);
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(userInfo); // Returns sensitive information
});

// Endpoint for updating user profile (vulnerable to Mass Assignment)
router.put('/update/:username', (req, res) => {
  const { username } = req.params;
  const userInfo = usersInfo.find(user => user.username === username);
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Mass assignment vulnerability
  Object.assign(userInfo, req.body);
  return res.json({ message: 'Profile updated', userInfo });
});

module.exports = router;
