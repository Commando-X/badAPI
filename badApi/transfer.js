// transfer.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Endpoint for transferring money between accounts
router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  
  const findAccountsQuery = 'SELECT * FROM users WHERE username = ? OR username = ?';
  db.query(findAccountsQuery, [from, to], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length < 2) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const [fromAccount, toAccount] = results;

    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transferQuery = 'UPDATE users SET balance = CASE username WHEN ? THEN balance - ? WHEN ? THEN balance + ? END WHERE username IN (?, ?)';
    db.query(transferQuery, [from, amount, to, amount, from, to], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.json({ message: 'Transfer successful' });
    });
  });
});

module.exports = router;
