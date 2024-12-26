import { Handlers } from "$fresh/server.ts";
import verifyGID from "../../utils/googleAuth.ts";
import type { TokenPayload } from "../../utils/googleAuth.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();
    if (!body.id_token) {
      return new Response("Missing id_token", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }
    const payload: TokenPayload | Error = await verifyGID(
      body.id_token,
    );

    if (payload instanceof Error) {
      return new Response(payload.message, {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
};
