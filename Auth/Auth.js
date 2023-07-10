const JWTStatergy = require("../Common/Statergie/JWTStatergy");

module.exports = function (req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    if (token == null) res.status(401).json("unauthorized");

    const userId = JWTStatergy.verifyToken(token);

    if (userId == null) res.status(403).json("Forbidden");

    req.userId = userId;

    next();
  } else {
    res.status(401).json("unauthorized");
  }
};
