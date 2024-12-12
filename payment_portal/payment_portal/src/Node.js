const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Function to disconnect from MongoDB
function disconnectDatabase() {
    mongoose.disconnect()
        .then(() => console.log('Database disconnected'))
        .catch((err) => console.error('Error disconnecting from the database:', err));
}

// User schema for MongoDB
const userSchema = new mongoose.Schema({
  fullName: String,
  idNumber: String,
  accountNumber: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  console.log('Incoming registration data:', req.body);

  if (!fullName || !idNumber || !accountNumber || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ idNumber });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword
    });

    await newUser.save();
    console.log('User registered successfully:', { fullName, idNumber, accountNumber });
    return res.json({ success: true, message: 'Registration successful.' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { idNumber, password } = req.body;

  console.log('Incoming login data:', req.body);

  if (!idNumber || !password) {
    return res.status(400).json({ success: false, message: 'ID number and password are required.' });
  }

  try {
    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user._id, idNumber: user.idNumber },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('User logged in successfully:', { idNumber });
    return res.json({
      success: true,
      message: 'Login successful.',
      token: token
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Example protected route
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    res.json({ success: true, message: 'Access granted to protected route', user: decoded });
  });
});

// Server stop event to disconnect from the database
process.on('SIGINT', () => {
  disconnectDatabase();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
