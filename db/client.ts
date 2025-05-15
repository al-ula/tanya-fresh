import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

const url = Deno.env.get("TURSO_DATABASE_URL");
const authToken = Deno.env.get("TURSO_AUTH_TOKEN");

if (!url || !authToken) {
  throw new Error(
    "TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables must be set",
  );
}

export const turso = createClient({
  url,
  authToken,
});

export const db = drizzle(turso);
