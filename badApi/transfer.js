const express = require('express');
const router = express.Router();
const db = require('./db');

/**
 * @swagger
 * tags:
 *   name: Transfer
 *   description: Money transfer-related endpoints
 */

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer money between accounts
 *     description: Transfers money from one user account to another, simulating potential vulnerabilities such as insufficient balance or lack of transaction validation.
 *     tags: [Transfer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 example: user1
 *               to:
 *                 type: string
 *                 example: user2
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 100.0
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transfer successful
 *       400:
 *         description: Insufficient balance or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Insufficient balance
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

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
