import express from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";
import {
  deleteTodo,
  partiallyUpdateTodo,
  updateFullTodo,
  getAllTodo,
  getTodoById,
  createTodo,
  markCompleted,
  markIncompleted,
} from "../controller/todo.controller.js";
const router = express.Router();

/* CRUD OPERATIONS */

router.get("/", ensureAuthenticated, getAllTodo);
router.post("/", ensureAuthenticated, createTodo);
router.get("/:id", ensureAuthenticated, getTodoById);
router.put("/updateall/:id", ensureAuthenticated, updateFullTodo);
router.patch("/update/:id", ensureAuthenticated, partiallyUpdateTodo);
router.delete("/delete/:id", ensureAuthenticated, deleteTodo);


/* STATUS UPDATE */

router.patch('/complete/:id', ensureAuthenticated, markCompleted)
router.patch('/incomplete/:id', ensureAuthenticated, markIncompleted)



export default router;
