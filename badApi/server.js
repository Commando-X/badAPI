// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const transferRoutes = require('./transfer');
const otpRoutes = require('./otp');
const accountRoutes = require('./account');
const adminRoutes = require('./admin'); // New admin routes

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register routes
app.use('/auth', authRoutes);
app.use('/transfer', transferRoutes);
app.use('/otp', otpRoutes);
app.use('/account', accountRoutes);
app.use('/admin', adminRoutes); // Register admin routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
