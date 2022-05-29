const asyncHandler = require("express-async-handler");
const Habits = require("../models/habits.js");

const getAllHabits = asyncHandler(async (req, res) => {
  const habits = await Habits.find();
  res.json(habits);
});
const createHabit = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please Add Text Field");
  }
  const { name, type, description, frequency, duration } = req.body;
  const newHabit = await Habits.create({
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
  res.json({ message: `Update Habit ${req.params.id}` });
});
const deleteHabit = asyncHandler(async (req, res) => {
  res.json({ message: `Delete Habit ${req.params.id}` });
});

module.exports = {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
