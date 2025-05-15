import { db } from "./client.ts";
import { message } from "./schema.ts";
import { desc, eq } from "drizzle-orm";
import { SmallUid } from "@al-ula/small-uid";

export interface Message {
  id: string;
  boardId: string;
  value: string;
  createdAt: Date;
}

export interface CreateMessage {
  boardId: string;
  value: string;
}

export async function createMessage(prop: CreateMessage) {
  let id: string;
  let existId: string | null;
  do {
    id = SmallUid.gen().string;
    const existMsg = await getMessage(id);
    if (!existMsg) {
      existId = null;
      break;
    }
    existId = existMsg.id;
  } while (existId !== null);

  try {
    const messageData = {
      id,
      board_id: prop.boardId,
      value: prop.value,
    };

    await db.insert(message).values(messageData);
  } catch (error) {
    if (
      error instanceof Error && "code" in error && error.name === "LibsqlError"
    ) {
      const sqliteError = error as { code: string };
      if (sqliteError.code === "SQLITE_CONSTRAINT") {
        return new Error("Message already exists");
      }
    }

    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function getMessage(id: string): Promise<Message | null> {
  const result = await db
    .select()
    .from(message)
    .where(eq(message.id, id))
    .limit(1);

  if (!result[0]) {
    return null;
  }

  const messageResult = {
    ...result[0],
    boardId: result[0].board_id,
  };

  return messageResult;
}

/**
 * Retrieves messages for a specific board with pagination
 * @param limit - Maximum number of messages to return
 * @param page - Page number for pagination (0-based)
 * @param boardId - ID of the board to get messages from
 * @returns Promise resolving to array of messages or null if no messages found
 */
export async function getPagedMessagesByBoardId(
  limit: number,
  page: number,
  boardId: string,
): Promise<Message[] | null> {
  if (limit < 1) {
    return null;
  }
  if (page < 0) {
    return null;
  }
  const result = await db
    .select()
    .from(message)
    .where(eq(message.board_id, boardId))
    .orderBy(desc(message.createdAt))
    .limit(limit)
    .offset(limit * page);

  if (result.length === 0) {
    return null;
  }

  const messages = result.map((msg) => {
    return {
      ...msg,
      boardId: msg.board_id,
    };
  });
  return messages;
}
