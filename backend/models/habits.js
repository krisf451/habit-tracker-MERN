const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name to your habit"],
    },
    type: {
      type: String,
      required: [true, "Please add if this is a good, bad, or neutral habit"],
    },
    description: {
      type: String,
      required: [true, "Please add a description to your habit"],
    },
    frequency: {
      type: String,
      required: [true, "Please add how often are you preforming this habit"],
    },
    duration: {
      type: String,
      required: [true, "How long have you had this habit"],
    },
  },
  { timestamps: true }
);

const Habits = mongoose.model("Habits", habitSchema);

module.exports = Habits;
