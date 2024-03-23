// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const transferRoutes = require('./transfer');
const otpRoutes = require('./otp');
const accountRoutes = require('./account');
const hallOfFameRoutes = require('./hallOfFame'); // Import Hall of Fame endpoint

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register authentication routes
app.use('/auth', authRoutes);

// Register transfer routes
app.use('/transfer', transferRoutes);

// Register OTP routes
app.use('/otp', otpRoutes);

// Register account info routes
app.use('/account', accountRoutes);

// Register Hall of Fame routes
app.use('/hall-of-fame', hallOfFameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
