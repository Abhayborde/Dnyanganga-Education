const express = require('express');
const bcrypt = require('bcryptjs');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const db = require('../config/db'); // Your database configuration
const router = express.Router();

// Register Route for Admin
router.post('/register', registerAdmin);

// Login Route for Admin
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Query the admin table to check if the email exists
  const query = 'SELECT * FROM admin WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing password', error: err });
        if (isMatch) {
          // On successful login, return user info and generate a token if needed
          return res.status(200).json({ message: 'Login successful', user });
        } else {
          return res.status(400).json({ message: 'Invalid password' });
        }
      });
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  });
});

module.exports = router;
