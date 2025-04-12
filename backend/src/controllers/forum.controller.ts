import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createForum = async (req: Request, res: Response): Promise<void> => {
  const { title, description, tags } = req.body;
  const userId = (req as any).user.id;

  try {
    const forum = await prisma.forum.create({
      data: {
        title,
        description,
        tags,
        userId,
      },
    });
    res.status(201).json(forum);
  } catch (err) {
    res.status(500).json({ error: "Failed to create forum" });
  }
};

export const getForums = async (req: Request, res: Response): Promise<void> => {
  try {
    const forums = await prisma.forum.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(forums);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forums" });
  }
};


export const getForumById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const forum = await prisma.forum.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        comments: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "asc" }
        }
      },
    });
    if (!forum) {
        res.status(404).json({ error: "Forum not found" });
        return;
    }
    
    res.status(200).json({
      ...forum,
      content: forum.description
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forum" });
  }
};


export const updateForum = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  const userId = (req as any).user.id;

  try {
    const existing = await prisma.forum.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const forum = await prisma.forum.update({
      where: { id },
      data: { title, description, tags },
    });

    res.status(200).json(forum);
  } catch (err) {
    res.status(500).json({ error: "Failed to update forum" });
  }
};

// Delete Forum
export const deleteForum = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const existing = await prisma.forum.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    await prisma.forum.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete forum" });
  }
};
