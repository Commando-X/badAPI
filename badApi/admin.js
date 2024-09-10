// admin.js
const express = require('express');
const router = express.Router();

// Endpoint for hidden admin signup (vulnerable to Broken Function-Level Authorization)
router.post('/hidden-admin-signup', (req, res) => {
  const { username, password } = req.body;
  
  // Simulated vulnerability: anyone can create an admin account
  const newAdmin = { username, password, role: 'admin' };
  users.push(newAdmin);
  
  return res.json({ message: 'Admin account created', newAdmin });
});

// Endpoint for granting loans (vulnerable to Insecure Direct Object Reference)
router.post('/grant-loan/:username', (req, res) => {
  const { username } = req.params;
  const { amount } = req.body;
  
  const user = usersInfo.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Grant loan without proper authorization checks
  user.balance += amount;
  return res.json({ message: 'Loan granted', user });
});

module.exports = router;
