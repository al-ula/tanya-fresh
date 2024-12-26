import { OAuth2Client } from "google-auth-library";
import type { TokenPayload } from "google-auth-library";

export type { TokenPayload };

const CLIENT_ID = Deno.env.get("GIS_CLIENT_ID") ?? (() => {
  throw new Error("GIS_CLIENT_ID environment variable is required");
})();

const client = new OAuth2Client();

export default async function verifyGID(
  idToken: string,
): Promise<TokenPayload | Error> {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    return new Error("Failed to get payload from Google ID token");
  }
  if ("error" in payload) {
    return new Error(String(payload.error));
  }

  return payload;
}
