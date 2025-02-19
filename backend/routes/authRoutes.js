const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Database configuration
const router = express.Router();

// Login Route
router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  // Validate input
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  // Determine the table based on role
  let query = '';
  if (role === 'admin') {
    query = 'SELECT * FROM admin WHERE email = ?';
  } else if (role === 'teacher') {
    query = 'SELECT * FROM teacher WHERE email = ?';
  } else if (role === 'counselor') {
    query = 'SELECT * FROM counselor WHERE email = ?';
  } else {
    return res.status(400).json({ message: 'Invalid role' });
  }

  // Query the database
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length > 0) {
      const user = result[0];

      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ message: 'Error comparing password', error: err });
        }

        if (isMatch) {
          console.log('Login successful for:', user.email);
          return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, role },
            token: '58a904c20fa4a45c4f87025281027c04daea40e5154f6f09356180fd211f88e0105b9a32cc06b2ec1472b9b82bce82cbbf0f1ff2efb5930d3694f41e8696be25', // Replace with real JWT logic
          });
        } else {
          return res.status(401).json({ message: 'Invalid password' });
        }
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
});

module.exports = router;
