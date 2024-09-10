const express = require('express');
const router = express.Router();

// In-memory database for loan applications
let loanApplications = [
  { username: 'user1', amount: 1000, status: 'pending' },
];

/**
 * @swagger
 * tags:
 *   name: Loan
 *   description: Loan-related endpoints
 */

/**
 * @swagger
 * /loan/apply:
 *   post:
 *     summary: Apply for a loan
 *     description: Submits a loan application, simulating a broken object-level authorization vulnerability where any user can apply for a loan.
 *     tags: [Loan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Loan application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Loan application submitted
 *                 newLoan:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: user1
 *                     amount:
 *                       type: number
 *                       format: float
 *                       example: 1000
 *                     status:
 *                       type: string
 *                       example: pending
 *       400:
 *         description: Bad request, likely due to missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 */

router.post('/apply', (req, res) => {
  const { username, amount } = req.body;
  
  // Simulate a loan application
  const newLoan = { username, amount, status: 'pending' };
  loanApplications.push(newLoan);
  
  return res.json({ message: 'Loan application submitted', newLoan });
});

module.exports = router;
