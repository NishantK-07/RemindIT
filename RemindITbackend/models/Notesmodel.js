const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  reminderAt: {
    type: Date,
    default: null,
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RemindUser", // reference to your user model
    required: true,
  },
});

const Notesmodel = mongoose.model("Notes", ProblemSchema);
module.exports = Notesmodel;
