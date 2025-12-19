import express from "express";
import Task from "../models/Task.js";
import { generateAISuggestion } from "../utils/ai.js";

const router = express.Router();

// Create new task
router.post("/", async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const aiSuggestion = await generateAISuggestion(title, description);

    const newTask = new Task({ title, description, assignedTo, aiSuggestion });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
