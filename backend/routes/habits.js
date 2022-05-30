const router = require("express").Router();
const {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habits.js");

const auth = require("../middleware/auth");

router.route("/").get(auth, getAllHabits).post(auth, createHabit);
router.route("/:id").put(auth, updateHabit).delete(auth, deleteHabit);

module.exports = router;
