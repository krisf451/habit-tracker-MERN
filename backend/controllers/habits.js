const asyncHandler = require("express-async-handler");

const getAllHabits = asyncHandler(async (req, res) => {
  res.json({ message: "Get all habits" });
});
const createHabit = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add Text Field");
  }
  res.json({ message: "Create Habit", data: req.body });
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
