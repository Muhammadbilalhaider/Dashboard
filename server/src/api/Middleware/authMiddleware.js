const jwt = require("jsonwebtoken");
const config = require("../Config/Config");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    console.log("Decoded User in authMiddleware:", req.user);
    next();
  });
};

module.exports = authMiddleware;
