const getAllHabits = (req, res) => {
  res.json({ message: "Get all habits" });
};
const createHabit = (req, res) => {
  res.json({ message: `Create Habit`, data: req.body });
};
const updateHabit = (req, res) => {
  res.json({ message: `Update Habit ${req.params.id}` });
};
const deleteHabit = (req, res) => {
  res.json({ message: `Delete Habit ${req.params.id}` });
};

module.exports = {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
