const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    if (userRole !== requiredRole) {
      return res.status(403).json({ error: `Access denied. Required role: ${requiredRole}` });
    }

    // Untuk role 'user', pastikan x-user-id ada
    if (requiredRole === 'user' && !userId) {
      return res.status(400).json({ error: 'x-user-id header is required for user role' });
    }

    next();
  };
};

module.exports = authMiddleware;