const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const checkToken =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!checkToken) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(new Error("Unauthorized"));
      }
      req.user = {
        id: decoded.id, // pass in the user's info
      };
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  next();
};