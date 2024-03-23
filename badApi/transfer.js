// transfer.js
const express = require('express');
const router = express.Router();

// In-memory database for storing account information
let accounts = [
  { id: 1, username: 'user1', accountNumber: '123456789', balance: 100 },
  { id: 2, username: 'user2', accountNumber: '987654321', balance: 50 },
];

// Endpoint for transferring money between accounts (vulnerable to IDOR)
router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  // Find accounts
  const fromAccount = accounts.find(acc => acc.username === from);
  const toAccount = accounts.find(acc => acc.accountNumber === to); // Use account number for recipient

  if (!fromAccount || !toAccount) {
    return res.status(404).json({ message: 'Account not found' });
  }

  // Check balance
  if (fromAccount.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  // Transfer money
  fromAccount.balance -= amount;
  toAccount.balance += amount;

  return res.json({ message: 'Transfer successful' });
});

module.exports = router;
