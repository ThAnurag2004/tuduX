import { categoriesTable } from "../model/index.js";
import { db } from "../db/index.js";
import { eq, and } from "drizzle-orm";

export async function categoryExists(name, user_id) {
  const existingCategory = await db
    .select()
    .from(categoriesTable)
    .where(
      and(
        eq(categoriesTable.user_id, user_id),
        eq(categoriesTable.name, name)
      )
    )
    .limit(1);

    return existingCategory.length > 0 ? existingCategory[0] : null;
}


export async function deleteUserCategory(categoryId, userId) {
  const [deleted] = await db
    .delete(categoriesTable)
    .where(
      and(
        eq(categoriesTable.id, categoryId),
        eq(categoriesTable.user_id, userId)
      )
    )
    .returning();

  return deleted; 
}