const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware.js");

require("dotenv").config();

const habitRoutes = require("./routes/habits.js");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Sanity Check Passed" });
});

app.use(errorHandler);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
