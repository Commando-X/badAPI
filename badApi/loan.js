// loan.js
const express = require('express');
const router = express.Router();

// In-memory database for loan applications
let loanApplications = [
  { username: 'user1', amount: 1000, status: 'pending' },
];

// Endpoint for applying for a loan (vulnerable to Broken Object-Level Authorization)
router.post('/apply', (req, res) => {
  const { username, amount } = req.body;
  
  // Simulate a loan application
  const newLoan = { username, amount, status: 'pending' };
  loanApplications.push(newLoan);
  
  return res.json({ message: 'Loan application submitted', newLoan });
});

module.exports = router;
