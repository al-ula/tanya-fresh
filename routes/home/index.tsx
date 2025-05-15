import { RouteContext } from "$fresh/server.ts";
import ShareCard from "../../islands/HomeShareCard.tsx";
import { getBoardFromJWT } from "../../utils/jwt.ts";
import { State } from "../../types/state.ts";
import MessageCard from "../../islands/HomeMessageCard.tsx";

// Change from state to data in props
export default async function Home(
  _req: Request,
  // deno-lint-ignore no-explicit-any
  ctx: RouteContext<any, State>,
) {
  const state: State = ctx.state;
  const { auth } = state; // Get auth from state
  const boardId: string = await getBoardFromJWT(auth) ?? ""; // Get board from auth
  return (
    <>
      <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
        <div class="prose prose-md my-4">
          <h2>Share your board!</h2>
        </div>
        <ShareCard boardId={boardId} />
        <MessageCard />
      </div>
    </>
  );
}
