import { Handlers } from "$fresh/server.ts";
import { getUserByEmail, getUserByGoogleEmail, User } from "../../db/user.ts";
import { getBoardByUserId } from "../../db/board.ts";
import { generateJWT } from "../../utils/jwt.ts";
import { verifyPassword } from "../../utils/password.ts";
import verifyGID from "../../utils/googleAuth.ts";
import type {
  EmailSigninBody,
  GoogleSigninBody,
} from "../../types/login-api.ts";

async function handleGoogleSignin(body: GoogleSigninBody): Promise<Response> {
  const payload = await verifyGID(body.id_token);
  if (payload instanceof Error) {
    return createErrorResponse("Invalid Google ID token", 401);
  }

  if (!payload.email) {
    return createErrorResponse("Invalid Google ID token", 401);
  }

  const user = await getUserByGoogleEmail(payload.email);
  if (!user) {
    return createErrorResponse("Account not found", 404);
  }

  return await createAuthResponse(user);
}

async function handleEmailSignin(body: EmailSigninBody): Promise<Response> {
  const user: User | null = await getUserByEmail(body.email);
  if (!user || !user.passHash) {
    // Using a generic message for security
    return createErrorResponse("Invalid email or password", 401);
  }

  const isPasswordValid = await verifyPassword(
    body.password,
    user.passHash,
  );
  if (!isPasswordValid) {
    return createErrorResponse("Invalid email or password", 401);
  }

  return await createAuthResponse(user);
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

async function createAuthResponse(user: User): Promise<Response> {
  // Remove sensitive data
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  const board = await getBoardByUserId(user.id);
  if (!board) {
    return createErrorResponse("Board not found, contact administrator", 404);
  }

  const jwt = await generateJWT(user.id, board.id);

  // TODO: Implement proper session/token generation
  return new Response(
    JSON.stringify(userData),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          `authToken=${jwt}; HttpOnly; Secure; SameSite=Strict; Path=/`,
      },
    },
  );
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();

      switch (body.type) {
        case "google":
          return await handleGoogleSignin(body as GoogleSigninBody);
        case "email":
          return await handleEmailSignin(body as EmailSigninBody);
        default:
          return createErrorResponse("Invalid login type", 400);
      }
    } catch (error) {
      console.error("Error in POST /api/signin:", error);
      return createErrorResponse("Authentication failed", 500);
    }
  },
};
