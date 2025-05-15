import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie":
          "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    });
  },
};
