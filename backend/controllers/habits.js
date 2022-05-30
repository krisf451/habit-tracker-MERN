const asyncHandler = require("express-async-handler");
const Habits = require("../models/habits.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");

const getAllHabits = asyncHandler(async (req, res) => {
  const habits = await Habits.find({ user: req.user.id });
  res.json(habits);
});

const createHabit = asyncHandler(async (req, res) => {
  const { name, type, description, frequency, duration } = req.body;

  if (!name || !type || !description || !frequency || !duration) {
    res.status(400);
    throw new Error(
      "Please Add Name, Type, Description, Frequency, and Durations Fields"
    );
  }
  const newHabit = await Habits.create({
    user: req.user.id,
    name,
    type,
    description,
    frequency,
    duration,
  });
  await newHabit.save();
  res.status(200).json(newHabit);
});

const updateHabit = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error(`No habit with ID ${_id} found`);
  }

  const habit = req.body;
  const habitCheck = await Habits.findById(req.params.id);

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (habitCheck.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedHabit = await Habits.findByIdAndUpdate(
    _id,
    { ...habit, _id },
    {
      new: true,
    }
  );
  res.status(200).json(updatedHabit);
});
const deleteHabit = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No habit with ID ${req.params.id} found`);
  }
  const habit = await Habits.findById(req.params.id);

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (habit.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Habits.findByIdAndRemove(req.params.id);
  res.json({ message: `Succesfully deleted Habit with ID ${req.params.id}` });
});

module.exports = {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
