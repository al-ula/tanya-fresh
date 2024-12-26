import { relations } from "drizzle-orm/relations";
import { board, message, reply, user } from "./schema";

export const boardRelations = relations(board, ({ one, many }) => ({
  user: one(user, {
    fields: [board.userId],
    references: [user.id],
  }),
  messages: many(message),
}));

export const userRelations = relations(user, ({ many }) => ({
  boards: many(board),
}));

export const messageRelations = relations(message, ({ one, many }) => ({
  board: one(board, {
    fields: [message.boardId],
    references: [board.id],
  }),
  replies: many(reply),
}));

export const replyRelations = relations(reply, ({ one }) => ({
  message: one(message, {
    fields: [reply.messageId],
    references: [message.id],
  }),
}));
