import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// API routes
app.use("/api/tasks", taskRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
