const express = require('express');
const router = express.Router();

// In-memory database for storing user information (including sensitive data)
const users = []; // Simulated user storage for the sake of example
const usersInfo = [
  { username: 'user1', dob: '1990-01-01', address: '5, 3rd mainland Bridge', cardInfo: '1234-5678-9012-3456', children: ['Child1', 'Child2'], balance: 1000, role: 'user' },
  { username: 'user2', dob: '1985-05-15', address: '7, Ghost street', cardInfo: '9876-5432-1098-7654', children: ['Child3'], balance: 500, role: 'user' },
];

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related endpoints
 */

/**
 * @swagger
 * /admin/hidden-admin-signup:
 *   post:
 *     summary: Create hidden admin account
 *     description: Allows the creation of an admin account without proper authorization checks, simulating a broken function-level authorization vulnerability.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: adminUser
 *               password:
 *                 type: string
 *                 example: securePassword
 *     responses:
 *       200:
 *         description: Admin account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin account created
 *                 newAdmin:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: adminUser
 *                     password:
 *                       type: string
 *                       example: securePassword
 *                     role:
 *                       type: string
 *                       example: admin
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

/**
 * @swagger
 * /admin/grant-loan/{username}:
 *   post:
 *     summary: Grant a loan to a user
 *     description: Grants a loan to a user without proper authorization checks, simulating an insecure direct object reference vulnerability.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to whom the loan is being granted
 *         schema:
 *           type: string
 *           example: user1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 500
 *     responses:
 *       200:
 *         description: Loan granted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Loan granted
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: user1
 *                     dob:
 *                       type: string
 *                       format: date
 *                       example: '1990-01-01'
 *                     address:
 *                       type: string
 *                       example: '5, 3rd mainland Bridge'
 *                     cardInfo:
 *                       type: string
 *                       example: '1234-5678-9012-3456'
 *                     children:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ['Child1', 'Child2']
 *                     balance:
 *                       type: number
 *                       format: float
 *                       example: 1500
 *                     role:
 *                       type: string
 *                       example: user
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */

router.post('/hidden-admin-signup', (req, res) => {
  const { username, password } = req.body;
  
  // Simulated vulnerability: anyone can create an admin account
  const newAdmin = { username, password, role: 'admin' };
  users.push(newAdmin);
  
  return res.json({ message: 'Admin account created', newAdmin });
});

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
