import { db } from "./client.ts";
import { board } from "./schema.ts";
import { eq } from "drizzle-orm";

export interface Board {
  id: string;
  createdAt: Date;
  userId: string | null;
  title: string;
}

export interface CreateBoard {
  id: string;
  userId: string;
  userName: string;
}

export async function createBoard(prop: CreateBoard) {
  try {
    const boardData = {
      id: prop.id,
      user_id: prop.userId,
      title: prop.userName,
    };

    await db.insert(board).values(boardData);
  } catch (error) {
    if (
      error instanceof Error && "code" in error && error.name === "LibsqlError"
    ) {
      const sqliteError = error as { code: string };
      if (sqliteError.code === "SQLITE_CONSTRAINT") {
        return new Error("Board already exists");
      }
    }

    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function getBoard(id: string): Promise<Board | null> {
  const result = await db
    .select()
    .from(board)
    .where(eq(board.id, id))
    .limit(1);

  if (!result[0]) {
    return null;
  }

  const boardResult = {
    ...result[0],
    userId: result[0].user_id,
  };

  return boardResult;
}

export async function getBoardByUserId(userId: string): Promise<Board | null> {
  const result = await db
    .select()
    .from(board)
    .where(eq(board.user_id, userId))
    .limit(1);

  if (!result[0]) {
    return null;
  }

  const boardResult = {
    ...result[0],
    userId: result[0].user_id,
  };

  return boardResult;
}
