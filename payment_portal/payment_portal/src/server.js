const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
require('dotenv').config(); // Load environment variables

// Import the Customer model
const Customer = require('./models/Customer');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_CONNSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Route to register a new customer
app.post('/api/register-customer', async (req, res) => {
  const { customerId, password } = req.body;

  try {
    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ customerId });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'Customer already exists' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer instance
    const newCustomer = new Customer({
      customerId,
      password: hashedPassword
    });

    // Save the customer to MongoDB
    await newCustomer.save();
    console.log('Customer registered successfully');
    res.json({ success: true, message: 'Customer registered successfully!' });
  } catch (error) {
    console.error('Error saving customer:', error);
    res.status(500).json({ success: false, message: 'Failed to register customer', error });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the International Payment Portal API');
});

// SSL options for HTTPS
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

// Start the server with HTTPS
const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
