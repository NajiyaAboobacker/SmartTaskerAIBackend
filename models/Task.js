import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  aiSuggestion: { type: String },
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
