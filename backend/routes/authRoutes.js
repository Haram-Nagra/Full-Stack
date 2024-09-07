const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware'); // Import roleMiddleware

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Private route for logout (only accessible to authenticated users)
router.post('/logout', authMiddleware, logout);

// Example of role-protected routes:

// Admin-only route (ensure that only admins can access)
router.get('/admin-dashboard', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// Customer support route (accessible to admin and customer support)
router.get('/support-center', authMiddleware, roleMiddleware(['admin', 'customer-support']), (req, res) => {
  res.json({ message: 'Welcome to the support center!' });
});

// Resident-only route
router.get('/resident-profile', authMiddleware, roleMiddleware(['resident']), (req, res) => {
  res.json({ message: 'Welcome to your profile page!' });
});





module.exports = router;
