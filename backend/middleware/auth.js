const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  let decodedData;

  if (token) {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
  } else {
    throw new Error("Invalid token");
  }
  next();
});

module.exports = auth;
