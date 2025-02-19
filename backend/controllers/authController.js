const bcrypt = require('bcrypt');
const db = require('../config/db');  // Your database connection

// Register a new user
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      return res.status(200).json({ success: true, message: 'User registered successfully' });
    });
  });
};

// Login a user
const login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user from database' });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result[0];

    // Compare provided password with hashed password from DB
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (match) {
        return res.status(200).json({ success: true, message: 'Login successful', user });
      } else {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
    });
  });
};

module.exports = { register, login };
