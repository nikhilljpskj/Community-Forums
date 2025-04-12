import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment.controller";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// router.post("/:forumId", authenticateToken, createComment);
router.post('/', authenticateToken, createComment);
router.delete("/:id", authenticateToken, deleteComment);

export default router;
