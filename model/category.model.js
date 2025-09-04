import { uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from './user.model.js';

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  user_id: uuid().notNull().references(() => usersTable.id),
});
