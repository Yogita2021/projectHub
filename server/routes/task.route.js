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
taskrouter.get("/tasks", async (req, res) => {
  try {
    const taskLists = await Tasklist.find().populate("assignedUser", "name");
    console.log(taskLists);
    if (!taskLists || taskLists.length === 0) {
      return res.status(404).json({ message: "No task lists found" });
    }
    res
      .status(200)
      .json({ message: "Task lists retrieved successfully", taskLists });
  } catch (error) {
    console.error("Error fetching task lists:", error);
    res.status(500).json({ error: "Unable to retrieve task lists" });
  }
});

module.exports = taskrouter;
