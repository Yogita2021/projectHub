const mongoose = require("mongoose");

// Sub-task schema
// const subTaskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   dueDate: Date,
//   priority: String,
//   status: String,
//   assignedTeamMembers: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
//   ], // Reference to User schema for assigned team members
// });

// Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  priority: String,
  status: String,
  assignedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "userData" }], // Reference to User schema for assigned team members
  subTasks: String, // Array of sub-tasks
});

const Tasklist = mongoose.model("Task", taskSchema);
module.exports = Tasklist;
