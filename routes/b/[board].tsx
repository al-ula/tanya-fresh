import { FreshContext, Handlers } from "$fresh/server.ts";
import { getBoardFromJWT } from "../../utils/jwt.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const state = ctx.state;
    const board = ctx.params.board;
    if (state.auth) {
      const tokenBoard = typeof state.auth === 'string' ? await getBoardFromJWT(state.auth) : null;
      if (board === tokenBoard) {
        return new Response(null, {
          status: 303,
          headers: { Location: "/home" },
        });
      }
    }

    return new Response("Hello World");
  },
};

export default function Board() {
  return <div>Board</div>;
}
