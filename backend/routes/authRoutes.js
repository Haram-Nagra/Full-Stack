// routes/authRoutes.js
const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authMiddleware, logout); // Protect logout route with middleware

module.exports = router;
