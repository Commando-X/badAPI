// otp.js
const express = require('express');
const router = express.Router();

// Endpoint for generating and verifying OTP (vulnerable to Lack of Rate Limiting)
router.post('/otp', (req, res) => {
  const otp = Math.floor(100 + Math.random() * 900); // Generate 3-digit random number
  return res.json({ otp });
});

module.exports = router;
