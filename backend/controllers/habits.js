const getAllHabits = (req, res) => {
  res.json({ message: "Sanity check for habits router passed" });
};

module.exports = {
  getAllHabits,
};
