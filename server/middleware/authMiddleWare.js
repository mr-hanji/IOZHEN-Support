const jwt = require("jsonwebtoken");
const constants = require("../constant/index");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      constants.secretPhrase
    );
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = verifyToken;
