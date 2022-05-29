const router = require("express").Router();
const {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habits.js");

router.route("/").get(getAllHabits).post(createHabit);
router.route("/:id").put(updateHabit).delete(deleteHabit);

module.exports = router;
