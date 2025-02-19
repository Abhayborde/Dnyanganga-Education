// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) return res.status(403).send('Access denied. No token provided.');

  // Verify the token
  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).send('Invalid token.');

    req.user = decoded; // Attach decoded user info to request
    next();
  });
};

module.exports = authMiddleware;
