// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate and extract user information from token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (userId and role) to the request object
    req.user = {
      id: decoded.userId,
      role: decoded.role,  // Extract the role from the decoded token
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

// Middleware to restrict access based on role
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: You do not have the required permissions' });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,  // Exporting a role-based middleware for future use
};

