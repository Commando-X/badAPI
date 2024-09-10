const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import routes
const authRoutes = require('./auth');
const transferRoutes = require('./transfer');
const otpRoutes = require('./otp');
const accountRoutes = require('./account');
const adminRoutes = require('./admin');
const registerRoutes = require('./register'); // Correct import for register route

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BadAPI Documentation',
      version: '1.0.0',
      description: 'API for a vulnerable fintech application developed by Badmus',
    },
  },
  apis: ['./*.js'], // Adjust this path as necessary
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes
app.use('/auth', authRoutes);
app.use('/transfer', transferRoutes);
app.use('/otp', otpRoutes);
app.use('/account', accountRoutes);
app.use('/admin', adminRoutes);
app.use('/register', registerRoutes); // Correctly register the register route

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
