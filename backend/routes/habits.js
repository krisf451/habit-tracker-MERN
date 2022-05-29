const router = require("express").Router();
const { getAllHabits } = require("../controllers/habits.js");

router.get("/", getAllHabits);

module.exports = router;
