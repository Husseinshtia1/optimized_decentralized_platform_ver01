
// backend/middleware/roleMiddleware.js
module.exports = function (roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
};
