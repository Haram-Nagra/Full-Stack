const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token with user ID and role
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role }, // Include role in the token
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// User signup controller
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validate role if provided
    const validRoles = ['admin', 'customer-support', 'resident'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Create a new user with username, password, and role
    const user = new User({ username, password, role: role || 'resident' }); // Default role is 'resident'
    await user.save();

    // Generate a token
    const token = generateToken(user);

    // Send the token and role in response
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token
    const token = generateToken(user);

    // Send the token and role in response
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User logout controller
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

// Admin-only function to add customer support users
exports.addCustomerSupport = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Ensure the requester is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    const user = new User({ username, password, role: 'customer-support' });
    await user.save();

    res.status(201).json({ message: 'Customer support user added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
