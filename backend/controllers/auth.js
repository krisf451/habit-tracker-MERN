const signup = (req, res) => {
  res.json({ message: "Sign up" });
};
const signin = (req, res) => {
  res.json({ message: "Sign in" });
};

module.exports = {
  signin,
  signup,
};
