import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middlewares/authMiddleware";
import redisClient from "../config/redis";

/**
 * CREATE TASK
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      owner: req.user.id,
    });

    // 🔥 Invalidate cache
    await redisClient.del(`tasks:${req.user.id}`);

    res.status(201).json({
      message: "Task created",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

/**
 * GET MY TASKS (WITH REDIS CACHING)
 */
export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const cacheKey = `tasks:${userId}`;

    // 1️⃣ Check cache
    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
      return res.status(200).json({
        source: "cache",
        tasks: JSON.parse(cachedTasks),
      });
    }

    // 2️⃣ Fetch from DB
    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });

    // 3️⃣ Store in Redis (TTL = 60 seconds)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(tasks));

    res.status(200).json({
      source: "db",
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

/**
 * UPDATE TASK
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id, // 🔐 ownership check
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 Invalidate cache
    await redisClient.del(`tasks:${req.user.id}`);

    res.status(200).json({
      message: "Task updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

/**
 * DELETE TASK
 */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      owner: req.user.id, // 🔐 ownership check
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 🔥 Invalidate cache
    await redisClient.del(`tasks:${req.user.id}`);

    res.status(200).json({
      message: "Task deleted",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
    });
  }
};