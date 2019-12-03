const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get Token from Headers
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(400).json({
      errors: [{ msg: "No token, authorization denied" }]
    });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: "Token is not valid" }]
    });
  }
  next();
};
