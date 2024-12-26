import {
  AnySQLiteColumn,
  blob,
  check,
  foreignKey,
  index,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const board = sqliteTable("board", {
  id: blob().primaryKey().notNull(),
  userId: blob("user_id").references(() => user.id),
  title: text().notNull(),
  timestamp: text().default("sql`(current_timestamp)`").notNull(),
}, (table) => [
  index("user_idx").on(table.userId),
  index("title_idx").on(table.title),
  check(
    "login_type",
    sql`(("user"."email" IS NOT NULL AND "user"."passHash" IS NOT NULL`,
  ),
]);

export const message = sqliteTable("message", {
  id: blob().primaryKey().notNull(),
  boardId: blob("board_id").notNull().references(() => board.id),
  value: text().notNull(),
  timestamp: text().default("sql`(current_timestamp)`").notNull(),
}, (table) => [
  index("board_idx").on(table.boardId),
  check(
    "login_type",
    sql`(("user"."email" IS NOT NULL AND "user"."passHash" IS NOT NULL`,
  ),
]);

export const reply = sqliteTable("reply", {
  id: blob().primaryKey().notNull(),
  messageId: blob("message_id").notNull().references(() => message.id),
  value: text().notNull(),
  timestamp: text().default("sql`(current_timestamp)`").notNull(),
}, (table) => [
  index("message_idx").on(table.messageId),
  check(
    "login_type",
    sql`(("user"."email" IS NOT NULL AND "user"."passHash" IS NOT NULL`,
  ),
]);

export const user = sqliteTable("user", {
  id: blob().primaryKey().notNull(),
  name: text().notNull(),
  email: text(),
  passHash: blob(),
  googleIdEmail: text(),
  timestamp: text().default("sql`(current_timestamp)`").notNull(),
}, (table) => [
  index("email_idx").on(table.email),
  index("gid_idx").on(table.googleIdEmail),
  uniqueIndex("user_googleIdEmail_unique").on(table.googleIdEmail),
  uniqueIndex("user_email_unique").on(table.email),
  check(
    "login_type",
    sql`(("user"."email" IS NOT NULL AND "user"."passHash" IS NOT NULL`,
  ),
]);
