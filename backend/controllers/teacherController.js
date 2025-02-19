const bcrypt = require('bcrypt');
const db = require('../config/db');

// Add Teacher
exports.addTeacher = async (req, res) => {
  const { email, password, address, qualification } = req.body;

  if (!email || !password || !address || !qualification) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO teacher (email, password, address, qualification) VALUES (?, ?, ?, ?)';
    db.query(query, [email, hashedPassword, address, qualification], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(201).json({ message: 'Teacher added successfully', teacherId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
