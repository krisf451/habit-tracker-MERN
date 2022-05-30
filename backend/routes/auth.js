const router = require("express").Router();
const { signup, signin, getMe } = require("../controllers/auth.js");
const auth = require("../middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", auth, getMe);

module.exports = router;
