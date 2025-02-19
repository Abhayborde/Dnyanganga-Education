const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Your database configuration

// Admin Register
exports.registerAdmin = (req, res) => {
    const { email, password, mobile_number } = req.body;

    // Check if email already exists
    const checkQuery = 'SELECT * FROM admin WHERE email = ?';
    db.query(checkQuery, [email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Hash the password before saving to database
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

            const insertQuery = 'INSERT INTO admin (email, password, mobile_number) VALUES (?, ?, ?)';
            db.query(insertQuery, [email, hashedPassword, mobile_number], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error registering admin', error: err });
                res.status(201).json({ message: 'Admin registered successfully' });
            });
        });
    });
};

// Admin Login
exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the admin by email
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing password', error: err });
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            // Generate a JWT token
            const token = jwt.sign(
                { id: result[0].id, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '4h' }
            );

            // Send the token to the client
            res.json({ token });
        });
    });
};
