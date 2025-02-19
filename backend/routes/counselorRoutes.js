const express = require('express');
const { addCounselor } = require('../controllers/counselorController');
const router = express.Router();

// Route to add a counselor
router.post('/add', addCounselor);

module.exports = router;
