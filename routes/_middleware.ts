import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
interface State {
  theme: string;
}

// export async function handler(req: Request, ctx: FreshContext<State>) {
//   const headers = req.headers;
//   const cookies = getCookies(headers);
//   const theme = cookies.theme;
//   ctx.state.theme = theme;
//   const resp = await ctx.next();
//   return resp;
// }

export const handler = [
  async function middleware1(req: Request, ctx: FreshContext<State>) {
    const headers = req.headers;
    const cookies = getCookies(headers);
    const theme = cookies.theme;
    ctx.state.theme = theme;
    const resp = await ctx.next();
    return resp;
  },
]