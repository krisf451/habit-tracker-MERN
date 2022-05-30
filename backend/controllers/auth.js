const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/user.js");

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid Credentials, Passwords do not match");
  }

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  if (existingUser) {
    res.status(200).json({
      _id: existingUser._id,
      email: existingUser.email,
      token: token,
    });
  } else {
    throw new Error("Something went wrong trying to sign in");
  }
});

const signup = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  if (!email || !password || !firstName || !lastName || !confirmPassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await User.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });

  const token = jwt.sign(
    { email: result.email, id: result._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  if (result) {
    res.status(201).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

module.exports = { signin, signup };
