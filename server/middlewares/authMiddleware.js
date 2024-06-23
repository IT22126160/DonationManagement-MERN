const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //get the token from header
    const token = req.header("authorization").split(" ")[1];
    const dcryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = dcryptedToken.userId;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
