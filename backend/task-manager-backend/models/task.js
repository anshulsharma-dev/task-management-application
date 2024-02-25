const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    startTime: String,
    endTime: String,
    isCompleted: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
