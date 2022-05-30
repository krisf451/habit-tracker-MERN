const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");

const auth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers?.authorization?.split(" ")[1];
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData?.id).select("-password");
    } else {
      throw new Error("Invalid token or no token present on headers");
    }
  } else {
    throw new Error(
      "Error with Headers, Use format Bearer (valid JWT token) in authorization header"
    );
  }

  next();
});

module.exports = auth;
