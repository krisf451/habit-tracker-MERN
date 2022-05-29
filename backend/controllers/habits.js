const asyncHandler = require("express-async-handler");
const Habits = require("../models/habits.js");
const mongoose = require("mongoose");

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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No workout with ID ${req.params.id} found`);
  }

  res.json({ message: `Update Habit ${req.params.id}` });
});
const deleteHabit = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No workout with ID ${req.params.id} found`);
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
