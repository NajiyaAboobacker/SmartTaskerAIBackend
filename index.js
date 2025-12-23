import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();

/* ✅ CORS */
app.use(cors({
  origin: "https://smart-tasker-ai-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

/* ✅ PRE-FLIGHT FIX (THIS WAS MISSING) */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

/* ✅ Body parser */
app.use(express.json());

/* ✅ Health */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ✅ Routes */
app.use("/api/tasks", taskRoutes);

/* ✅ Mongo */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

/* ✅ Server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
