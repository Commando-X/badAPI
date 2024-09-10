const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP-related endpoints
 */

/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Generate an OTP
 *     description: Generates a One-Time Password (OTP), simulating a vulnerability due to lack of rate limiting.
 *     tags: [OTP]
 *     responses:
 *       200:
 *         description: OTP generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: integer
 *                   example: 123456
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

router.post('/otp', (req, res) => {
  const otp = Math.floor(100 + Math.random() * 900); // Generate 3-digit random number
  return res.json({ otp });
});

module.exports = router;
