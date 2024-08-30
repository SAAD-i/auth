const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//  @desc    Register user
//  @route   POST  /api/auth/register
//  @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (password.length > 8) {
    res
      .status(400)
      .json({ message: "Password cannot be longer than 8 characters" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  res.status(200).json({ message: "User has been created.", user });
});

//  @desc    Login user
//  @route   POST  /api/auth/login
//  @access  Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "User logined successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
