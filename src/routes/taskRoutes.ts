import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createTask, getMyTasks, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getMyTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;