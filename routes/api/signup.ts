import { Handlers } from "$fresh/server.ts";
import {
  CreateUser,
  createUser,
  getUserByEmail,
  getUserByGoogleEmail,
  getUserById,
  User,
} from "../../db/user.ts";
import { generateJWT } from "../../utils/jwt.ts";
import { SmallUid } from "@al-ula/small-uid";
import { hashPassword } from "../../utils/password.ts";
import verifyGID from "../../utils/googleAuth.ts";
import type {
  EmailSignupBody,
  GoogleSignupBody,
} from "../../types/signup-api.ts";
import { createBoard, getBoard } from "../../db/board.ts";
import type { Board, CreateBoard } from "../../db/board.ts";

const PASSVALIDATE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]{8,100}$/;

const EMAILVALIDATE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

async function handleGoogleSignup(body: GoogleSignupBody): Promise<Response> {
  const payload = await verifyGID(body.id_token);
  if (payload instanceof Error) {
    return createErrorResponse("Invalid Google ID token", 400);
  }

  if (!payload.email) {
    return createErrorResponse("Invalid Google ID token", 400);
  }

  if (!validateEmail(payload.email)) {
    return createErrorResponse("Invalid Google ID token", 400);
  }

  const userData: CreateUser = {
    id: SmallUid.gen().string,
    name: body.name,
    googleIdEmail: payload.email,
  };

  return await createUserAndRespond(userData);
}

async function handleEmailSignup(body: EmailSignupBody): Promise<Response> {
  if (!validateEmail(body.email)) {
    return createErrorResponse("Invalid email format", 400);
  }
  if (!validatePassword(body.password)) {
    return createErrorResponse("Invalid password format", 400);
  }

  const userData: CreateUser = {
    id: "",
    name: body.name,
    createdAt: Date.now(),
    email: body.email,
    passHash: await hashPassword(body.password),
  };

  return await createUserAndRespond(userData);
}

function validateEmail(email: string): boolean {
  return EMAILVALIDATE.test(email);
}

function validatePassword(password: string): boolean {
  return PASSVALIDATE.test(password);
}

function createErrorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}

async function createUserAndRespond(userData: CreateUser): Promise<Response> {
  if (!userData.name?.trim()) {
    return createErrorResponse("Invalid or missing name", 400);
  }
  userData.name = userData.name.trim();

  // 1. Check if user exists based on email
  if ("email" in userData) {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      return createErrorResponse("User already exists", 409);
    }
  } else if ("googleIdEmail" in userData) {
    const existingUser = await getUserByGoogleEmail(userData.googleIdEmail);
    if (existingUser) {
      return createErrorResponse("User already exists", 409);
    }
  }

  // Generate and set unique ID
  userData.id = await generateUniqueId();

  // 3. Create user
  const result = await createUser(userData);

  if (result instanceof Error) {
    console.error("Create user error:", result);
    return createErrorResponse("Unable to create user account", 500);
  }

  const responseData = { ...userData } as Partial<CreateUser>;
  if ("passHash" in responseData) {
    delete responseData.passHash;
  }

  const board = await tryCreateBoard(userData.id, userData.name);
  if (board instanceof Error) {
    return createErrorResponse("Failed to create board", 500);
  }

  const jwt = await generateJWT(userData.id, board);

  return new Response(
    JSON.stringify(responseData),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          `authToken=${jwt}; HttpOnly; Secure; SameSite=Strict; Path=/`,
      },
    },
  );
}

async function generateUniqueId(): Promise<string> {
  let id: string;
  let existingUser: User | null;

  do {
    id = SmallUid.gen().string;
    existingUser = await getUserById(id);
  } while (existingUser !== null);

  return id;
}

async function generateUniqueBoardId(): Promise<string> {
  let boardId: string;
  let existingBoard: Board | null;
  do {
    boardId = SmallUid.gen().string;
    existingBoard = await getBoard(boardId);
  } while (existingBoard !== null);
  return boardId;
}

async function tryCreateBoard(
  userId: string,
  userName: string,
): Promise<string | Error> {
  const boardId = await generateUniqueBoardId();
  const boardData: CreateBoard = {
    id: boardId,
    userId,
    userName,
  };

  const board = await createBoard(boardData);
  if (board instanceof Error) {
    console.error("Create board error:", board);
    return new Error("Unable to create default board");
  }
  return boardId;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();

      if (!body.name) {
        return createErrorResponse("Name is required", 400);
      }

      if (body.type === "google") {
        return await handleGoogleSignup(body as GoogleSignupBody);
      } else if (body.type === "email") {
        return await handleEmailSignup(body as EmailSignupBody);
      } else {
        return createErrorResponse("Invalid signup type", 400);
      }
    } catch (error) {
      console.error("Error in POST /api/signup:", error);
      return createErrorResponse("Failed to create user", 500);
    }
  },
};
