// middleware/verifyToken.js
const jwt = require('jwt-simple');

// Middleware function to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const secret = 'your_secret_key';  // This should be the same key used to generate the token
    const decoded = jwt.decode(token, secret);
    req.user = decoded;  // Attach the decoded user info to the request object
    next();  // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = verifyToken;
