const jwt = require("jsonwebtoken");
jwtKey = "dtdtdtdtdtdtdtdtdtdt";
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, jwtKey);
    req.userData = decode;
    //return res.json(decode);
    next();
  } catch (error) {
    res.status(401).json("Unauthorized User");
  }
};
