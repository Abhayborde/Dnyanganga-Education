// middleware/roleMiddleware.js
const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).send('You do not have permission to access this route.');
    }
    next();
  };
};

module.exports = roleMiddleware;
