import {
  check,
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().unique(),
  passHash: text(),
  googleIdEmail: text().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
}, (t) => [
  check(
    "login_type",
    sql`((${t.email} IS NOT NULL AND ${t.passHash} IS NOT NULL)
    OR ${t.googleIdEmail} IS NOT NULL)`,
  ),
  index("gid_idx").on(t.googleIdEmail),
  index("email_idx").on(t.email),
]);

export const board = sqliteTable("board", {
  id: text().primaryKey(),
  user_id: text().references(() => user.id),
  title: text().notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
}, (t) => [
  index("title_idx").on(t.title),
  index("user_idx").on(t.user_id),
]);

export const message = sqliteTable("message", {
  id: text().primaryKey(),
  board_id: text().references(() => board.id).notNull(),
  value: text().notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
}, (t) => [
  index("board_idx").on(t.board_id),
]);

export const reply = sqliteTable("reply", {
  id: text().primaryKey(),
  message_id: text().references(() => message.id).notNull(),
  value: text().notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
}, (t) => [
  index("message_idx").on(t.message_id),
]);
