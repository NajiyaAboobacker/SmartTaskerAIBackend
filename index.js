import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();

/* ✅ CORS — SAFE & CORRECT */
app.use(cors({
  origin: "https://smart-tasker-ai-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

/* ✅ Body parser */
app.use(express.json());

/* ✅ Health check */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ✅ Routes */
app.use("/api/tasks", taskRoutes);

/* ✅ MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

/* ✅ Server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
