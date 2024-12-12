const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
const mongoURI = 'mongodb+srv://nisaarkhan167:<db_password>@apds.h1xtc.mongodb.net/?retryWrites=true&w=majority&appName=APDS';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const Employee = mongoose.model('Employee', new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

app.post('/api/login', async (req, res) => {
  const { employeeId, password } = req.body;
  
  if (!employeeId || !password) {
    return res.status(400).json({ message: 'Employee ID and password are required' });
  }

  const employee = await Employee.findOne({ employeeId: employeeId });
  if (!employee) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const payload = { employeeId: employee.employeeId };
  const secret = 'your_secret_key'; 
  const token = jwt.encode(payload, secret);

  return res.json({ message: 'Login successful', token });
});
