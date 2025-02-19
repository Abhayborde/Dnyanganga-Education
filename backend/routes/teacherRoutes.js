const express = require('express');
const { addTeacher } = require('../controllers/teacherController');
const router = express.Router();

// Route to add a teacher
router.post('/add', addTeacher);

module.exports = router;
