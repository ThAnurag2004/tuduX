import { todostable, categoriesTable } from "../model/index.js";
import { db } from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { todoValidationBodySchema } from "../validation/todo.validation.js";
import { categoryExists } from "../service/category.service.js";

/* THESE ARE ALL THE BASIC CRUD OPERATIONS ROUTES */

//Get All Todos of login User
export const getAllTodo = async function (req, res) {
  try {
    const todo = await db
      .select({
        id: todostable.id,
        title: todostable.title,
        description: todostable.description,
        completed: todostable.completed,
        createdAt: todostable.createdAt,
        updatedAt: todostable.updatedAt,
      })
      .from(todostable)
      .where(eq(todostable.user_id, req.user.id));

    return res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

//Create Todo by authenticated user
export const createTodo = async function (req, res) {
  try {
    const validationResult = await todoValidationBodySchema.safeParseAsync(
      req.body
    );

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { title, description, completed, categoryName } =
      validationResult.data;

    const existingCategory = await categoryExists(categoryName, req.user.id);

    let createdId;

    if (existingCategory) {
      createdId = existingCategory.id;
    } else {
      const inserted = await db
        .insert(categoriesTable)
        .values({
          name: categoryName,
          user_id: req.user.id
        })
        .returning({ id: categoriesTable.id });

      createdId = inserted[0].id;
    }

    console.log(createdId);

    const [todo] = await db
      .insert(todostable)
      .values({
        title,
        description,
        completed,
        user_id: req.user.id,
        category_id: createdId,
      })
      .returning({
        id: todostable.id,
        title: todostable.title,
        description: todostable.description,
        completed: todostable.completed,
        createdAt: todostable.createdAt,
        updatedAt: todostable.updatedAt,
        user_id: todostable.user_id,
        category_id: todostable.category_id,
      });

    return res.status(200).json(todo);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unable to Create Todo", details: error.message });
  }
};

//fetching todo by Id
export const getTodoById = async function (req, res) {
  try {
    const { id } = req.params;

    const [todo] = await db
      .select()
      .from(todostable)
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)));

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo" });
  }
};

// updating full todo
export const updateFullTodo = async function (req, res) {
  try {
    const { id } = req.params;
    const validationResult = await todoValidationBodySchema.safeParseAsync(
      req.body
    );

    if (!validationResult.success) {
      return res
        .status(400)
        .json({ message: "Please Enter all the details properly" });
    }

    const { title, description, completed } = validationResult.data;

    const [updated] = await db
      .update(todostable)
      .set({
        title,
        description,
        completed,
        updatedAt: new Date(),
      })
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)))
      .returning();

    if (!updated) return res.status(404).json({ message: "Todo not found" });

    return res
      .status(200)
      .json({ message: "todo updated successfully", updated });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update todo" });
  }
};

// updating certain fields in todo
export const partiallyUpdateTodo = async function (req, res) {
  try {
    const { id } = req.params;

    const [updated] = await db
      .update(todostable)
      .set({
        ...req.body,
        updatedAt: new Date(),
      })
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)))
      .returning();

    if (!updated) return res.status(404).json({ message: "Todo not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// deleting the todo
export const deleteTodo = async function (req, res) {
  try {
    const { id } = req.params;

    const [deleted] = await db
      .delete(todostable)
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)))
      .returning();

    if (!deleted) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

/* THESE ARE THE STATUS UPDATE ROUTES */

//mark todo as completed

export const markCompleted = async function (req, res) {
  try {
    const { id } = req.params;
    const [updatedTodo] = await db
      .update(todostable)
      .set({ completed: true, updatedAt: new Date() })
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)))
      .returning();

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo marked as completed", updatedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot update status", details: error.message });
  }
};

//mark todo as incompleted

export const markIncompleted = async function (req, res) {
  try {
    const { id } = req.params;
    const [updatedTodo] = await db
      .update(todostable)
      .set({ completed: false, updatedAt: new Date() })
      .where(and(eq(todostable.id, id), eq(todostable.user_id, req.user.id)))
      .returning();

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo marked as incompleted", updatedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot update status", details: error.message });
  }
};
