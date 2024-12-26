import { db } from "./client.ts";
import { user } from "./schema.ts";
import { eq } from "drizzle-orm";

// Base interface for common user fields
interface BaseUser {
  id: string;
  name: string;
  createdAt?: number;
}

// Interface for email/password registration
export interface CreateUserByEmail extends BaseUser {
  email: string;
  passHash: string;
}

// Interface for Google OAuth registration
export interface CreateUserByGoogleId extends BaseUser {
  googleIdEmail: string;
}

export interface User {
  name: string;
  id: string;
  email: string | null;
  passHash: string | null;
  googleIdEmail: string | null;
  createdAt: Date;
}

// Union type for both registration methods
export type CreateUser = CreateUserByEmail | CreateUserByGoogleId;

// Type guard for email/password user
function isEmailUser(userData: CreateUser): userData is CreateUserByEmail {
  return "email" in userData && "passHash" in userData;
}

/**
 * Creates a new user in the database
 * @param userData User data for either email or Google registration
 * @throws Error if user creation fails
 */
export async function createUser(userData: CreateUser) {
  try {
    const baseUser = {
      id: userData.id,
      name: userData.name,
      createdAt: new Date(userData.createdAt ?? Date.now()),
    };

    if (isEmailUser(userData)) {
      await db.insert(user).values({
        ...baseUser,
        email: userData.email,
        passHash: userData.passHash,
      });
    } else if ("googleIdEmail" in userData) {
      await db.insert(user).values({
        ...baseUser,
        googleIdEmail: userData.googleIdEmail,
      });
    } else {
      throw new Error("Invalid user data");
    }
  } catch (error) {
    // console.error("Error creating user:", error);

    // Check if it's a LibsqlError
    if (
      error instanceof Error && "code" in error && error.name === "LibsqlError"
    ) {
      const sqliteError = error as { code: string };
      if (sqliteError.code === "SQLITE_CONSTRAINT") {
        return new Error("User already exists");
      }
    }

    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function getUserByEmail(
  email: string,
): Promise<User | null> {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  return result[0] || null;
}

export async function getUserByGoogleEmail(
  googleIdEmail: string,
): Promise<User | null> {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.googleIdEmail, googleIdEmail))
    .limit(1);
  return result[0] || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.id, id))
    .limit(1);
  return result[0] || null;
}
