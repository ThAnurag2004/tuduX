import { db } from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { categoriesTable } from "../model/index.js";
import { categoryValidationBodySchema } from "../validation/category.validation.js";
import {categoryExists, deleteUserCategory} from '../service/category.service.js'

// get all the categories

export const getCategoryRoute = async function (req, res) {
  try {
    const categories = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.user_id, req.user.id));
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching categories" });
  }
};

//create new categories

export const createCategoryRoute = async function (req, res) {
  try {
    const validationResult = await categoryValidationBodySchema.safeParseAsync(
      req.body
    );

    if (!validationResult.success) {
      return res.status(400).json({ error: "Please provide a valid title" });
    }

    const { name } = validationResult.data;

    // check if the category already exists
    const existing = await categoryExists(name, req.user.id);    
    if(existing) return res.status(400).json({ error: "Category already exists" });

    const [category] = await db
      .insert(categoriesTable)
      .values({
        name,
        user_id: req.user.id,
      })
      .returning();

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error in creating categories" });
  }
};


export const deleteCategoryRoute = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserCategory(id, req.user.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", details: error.message });
  }
};