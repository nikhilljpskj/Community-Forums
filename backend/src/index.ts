import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import forumRoutes from "./routes/forum.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true 
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/comments", commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

