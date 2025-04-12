import { Router } from "express";
import {
  createForum,
  getForums,
  getForumById,
  updateForum,
  deleteForum,
} from "../controllers/forum.controller";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getForums);
router.get("/:id", getForumById);
router.post("/", authenticateToken, createForum);
router.put("/:id", authenticateToken, updateForum);
router.delete("/:id", authenticateToken, deleteForum);

export default router;
