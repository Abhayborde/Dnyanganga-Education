const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Ensure this points to your database configuration
const authRoutes = require('./routes/authRoutes'); // Auth routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes
const teacherRoutes = require('./routes/teacherRoutes'); // Teacher routes
const counselorRoutes = require('./routes/counselorRoutes'); // Counselor routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/teacher', teacherRoutes); // Teacher-related routes
app.use('/api/counselor', counselorRoutes); // Counselor-related routes

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
