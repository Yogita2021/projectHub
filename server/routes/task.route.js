// task.routes.js

const express = require("express");
const taskrouter = express.Router();
const mongoose = require("mongoose");
const Tasklist = require("../model/task.model"); // Import the Task model
const { authenticateUser, requireRole } = require("../middleware/auth");
// POST route to add a new task
taskrouter.post(
  "/create",
  authenticateUser,
  requireRole(["Admin", "ProjectManager"]),
  async (req, res) => {
    try {
      // Create a new task based on the request body
      const newTask = new Tasklist(req.body);

      // Save the task to the database
      const savedTask = await newTask.save();

      res.status(200).json({ message: "Task addded!", savedTask: savedTask });
    } catch (error) {
      res.status(201).json({ error: "Unable to add task" });
    }
  }
);
// taskrouter.get("/tasks", async (req, res) => {
//   try {
//     const taskLists = await Tasklist.find()
//       .populate("assignedUser", "name")
//       .populate("team", "teamName");
//     console.log(taskLists);
//     if (!taskLists || taskLists.length === 0) {
//       return res.status(404).json({ message: "No task lists found" });
//     }
//     res
//       .status(200)
//       .json({ message: "Task lists retrieved successfully", taskLists });
//   } catch (error) {
//     console.error("Error fetching task lists:", error);
//     res.status(500).json({ error: "Unable to retrieve task lists" });
//   }
// });
taskrouter.get("/tasks/:teamId", async (req, res) => {
  try {
    const teamId = req.params.teamId; // Get the teamId from the URL parameter

    // Your code to retrieve and filter tasks by teamId
    const taskLists = await Tasklist.find({ team: teamId })
      .populate("assignedUser", "name")
      .populate("team", "teamName");

    if (!taskLists || taskLists.length === 0) {
      return res
        .status(404)
        .json({ message: "No task lists found for this team" });
    }

    res
      .status(200)
      .json({ message: "Task lists retrieved successfully", taskLists });
  } catch (error) {
    console.error("Error fetching task lists:", error);
    res.status(400).json({ error: "Unable to retrieve task lists" });
  }
});
// Update an existing task by ID
taskrouter.put("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedData = req.body;

    const updatedTask = await Tasklist.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Unable to update task" });
  }
});
// Delete a task by ID
taskrouter.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Tasklist.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Unable to delete task" });
  }
});

module.exports = taskrouter;
