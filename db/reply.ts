import { db } from "./client.ts";
import { reply } from "./schema.ts";
import { asc, eq } from "drizzle-orm";
import { SmallUid } from "@al-ula/small-uid";

export interface Reply {
  id: string;
  messageId: string;
  value: string;
  createdAt: Date;
}

export interface CreateReply {
  messageId: string;
  value: string;
}

export async function createReply(prop: CreateReply) {
  let id: string;
  let existId: string | null;
  do {
    id = SmallUid.gen().string;
    const existReply = await getReply(id);
    if (!existReply) {
      existId = null;
      break;
    }
    existId = existReply.id;
  } while (existId !== null);

  try {
    const replyData = {
      id,
      message_id: prop.messageId,
      value: prop.value,
    };

    await db.insert(reply).values(replyData);
  } catch (error) {
    if (
      error instanceof Error && "code" in error && error.name === "LibsqlError"
    ) {
      const sqliteError = error as { code: string };
      if (sqliteError.code === "SQLITE_CONSTRAINT") {
        return new Error("Reply already exists");
      }
    }

    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function getReply(id: string): Promise<Reply | null> {
  const result = await db
    .select()
    .from(reply)
    .where(eq(reply.id, id))
    .limit(1);

  if (!result[0]) {
    return null;
  }

  const replyResult = {
    ...result[0],
    messageId: result[0].message_id,
  };

  return replyResult;
}

/**
 * Retrieves replies for a specific message with pagination
 * @param limit - Maximum number of replies to return
 * @param page - Page number for pagination (0-based)
 * @param messageId - ID of the message to get replies from
 * @returns Promise resolving to array of replies or null if no replies found
 */
export async function getPagedRepliesByMessageId(
  limit: number,
  page: number,
  messageId: string,
): Promise<Reply[] | null> {
  if (limit < 1) {
    return null;
  }
  if (page < 0) {
    return null;
  }
  const result = await db
    .select()
    .from(reply)
    .where(eq(reply.message_id, messageId))
    .orderBy(asc(reply.createdAt))
    .limit(limit)
    .offset(limit * page);

  if (result.length === 0) {
    return null;
  }

  const replies = result.map((rep) => {
    return {
      ...rep,
      messageId: rep.message_id,
    };
  });
  return replies;
}

export async function getRepliesByMessageId(
  messageId: string,
): Promise<Reply[] | null> {
  const result = await db
    .select()
    .from(reply)
    .where(eq(reply.message_id, messageId))
    .orderBy(asc(reply.createdAt));

  if (result.length === 0) {
    return null;
  }

  const replies = result.map((rep) => {
    return {
      ...rep,
      messageId: rep.message_id,
    };
  });
  return replies;
}
