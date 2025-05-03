import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  generateToken(res, user._id);

  res.status(201).json(user);
});

// Login (UPDATED)
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Check if user is suspended
  if (user.isSuspended) {
    res.status(403);
    throw new Error("Account suspended. Contact support.");
  }

  // Match password
  if (await user.matchPassword(password)) {
    generateToken(res, user._id);
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
});

// Get Profile
export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
