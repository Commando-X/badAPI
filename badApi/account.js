const express = require('express');
const router = express.Router();

// In-memory database for storing user information (including sensitive data)
const usersInfo = [
  { username: 'user1', dob: '1990-01-01', address: '5, 3rd mainland Bridge', cardInfo: '1234-5678-9012-3456', children: ['Child1', 'Child2'], balance: 1000, role: 'user' },
  { username: 'user2', dob: '1985-05-15', address: '7, Ghost street', cardInfo: '9876-5432-1098-7654', children: ['Child3'], balance: 500, role: 'user' },
];

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: User account endpoints
 */

/**
 * @swagger
 * /account/info/{username}:
 *   get:
 *     summary: Get user account information
 *     description: Retrieves user account information, which may include sensitive data
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose information is being retrieved
 *         schema:
 *           type: string
 *           example: user1
 *     responses:
 *       200:
 *         description: User account information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user1
 *                 dob:
 *                   type: string
 *                   format: date
 *                   example: '1990-01-01'
 *                 address:
 *                   type: string
 *                   example: '5, 3rd mainland Bridge'
 *                 cardInfo:
 *                   type: string
 *                   example: '1234-5678-9012-3456'
 *                 children:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['Child1', 'Child2']
 *                 balance:
 *                   type: number
 *                   format: float
 *                   example: 1000
 *                 role:
 *                   type: string
 *                   example: user
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

/**
 * @swagger
 * /account/update/{username}:
 *   put:
 *     summary: Update user profile
 *     description: Updates user profile information. Be cautious of mass assignment vulnerabilities.
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose profile is being updated
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
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: '1990-01-01'
 *               address:
 *                 type: string
 *                 example: '5, 3rd mainland Bridge'
 *               cardInfo:
 *                 type: string
 *                 example: '1234-5678-9012-3456'
 *               children:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['Child1', 'Child2']
 *               balance:
 *                 type: number
 *                 format: float
 *                 example: 1000
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated
 *                 userInfo:
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
 *                       example: 1000
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

router.get('/info/:username', (req, res) => {
  const { username } = req.params;
  const userInfo = usersInfo.find(user => user.username === username);
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(userInfo); // Returns sensitive information
});

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
