// Middleware to check if logged in user has required role
const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No user info found" });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next(); // User has correct role, continue
  };
};

module.exports = roleCheck;
