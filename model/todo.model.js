import {
  uuid,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import {usersTable} from './user.model.js'
import {categoriesTable} from './index.js'

export const todostable = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  completed: boolean().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  user_id: uuid().references(()=>usersTable.id),
  category_id: uuid().references(() => categoriesTable.id).notNull(), 
});
