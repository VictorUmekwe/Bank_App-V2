import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User not found");

  user.name = req.body.name || user.name;
  user.balance = req.body.balance || user.balance;
  user.isSuspended = req.body.isSuspended || user.isSuspended;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User not found");

  await user.deleteOne();
  res.json({ message: "User deleted" });
});

export const suspendUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User not found");

  user.isSuspended = !user.isSuspended;
  await user.save();

  res.json({
    message: user.isSuspended ? "User suspended" : "User unsuspended",
  });
});

export const getBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});
