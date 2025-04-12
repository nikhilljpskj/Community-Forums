import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

// Create Comment
export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { content, forumId } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token
  if (!token) {
    res.status(401).json({ error: "User not logged in" });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!user || !user.id) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        forumId,
        userId: user.id, // Associate with logged-in user
      },
    });
    res.status(201).json(newComment); // Send the response here
  } catch (err) {
    res.status(500).json({ error: "Failed to post comment" });
  }
};

// Delete Comment
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    await prisma.comment.delete({ where: { id } });
    res.status(204).end(); // Ensure you return a response here as well
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
