import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { State } from "../types/state.ts";
import { JWT, verifyJWT } from "../utils/jwt.ts";
// export async function handler(req: Request, ctx: FreshContext<State>) {
//   const headers = req.headers;
//   const cookies = getCookies(headers);
//   const theme = cookies.theme;
//   ctx.state.theme = theme;
//   const resp = await ctx.next();
//   return resp;
// }

export const handler = [
  async function themeMiddleware(req: Request, ctx: FreshContext<State>) {
    const headers = req.headers;
    const cookies = getCookies(headers);
    ctx.state.theme = cookies.theme;
    return await ctx.next();
  },
  async function langMiddleware(req: Request, ctx: FreshContext<State>) {
    const headers = req.headers;
    const cookies = getCookies(headers);
    ctx.state.lang = cookies.lang;
    return await ctx.next();
  },
  async function isLoggedInMiddleware(
    req: Request,
    ctx: FreshContext<State>,
  ) {
    const path = new URL(req.url).pathname;
    const shouldRedirect = ["/", "/login", "/signup"].includes(path);
    const cookies = getCookies(req.headers);
    const authToken = cookies.authToken;
    const isAuth = await verifyJWT(authToken);
    if (shouldRedirect && isAuth && isAuth !== null) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/home" },
      });
    }
    return await ctx.next();
  },
  async function isNotLoggedInMiddleware(
    req: Request,
    ctx: FreshContext<State>,
  ) {
    const path = new URL(req.url).pathname;
    const shouldRedirect = ["/home"].includes(path);
    const cookies = getCookies(req.headers);
    const authToken = cookies.authToken;
    const isAuth = await verifyJWT(authToken);
    if (shouldRedirect && (!isAuth || isAuth === null)) {
      const response = new Response(null, {
        status: 303,
        headers: {
          Location: "/",
          "Set-Cookie":
            "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
        },
      });
      return response;
    }
    return await ctx.next();
  },
  async function authStateMiddleware(
    req: Request,
    ctx: FreshContext<State>,
  ) {
    const cookies = getCookies(req.headers);
    // console.log("All cookies:", cookies);
    const authToken = cookies.authToken;
    // console.log("authToken from cookie:", authToken);
    ctx.state.auth = authToken;
    // console.log("State after setting auth:", ctx.state);
    return await ctx.next();
  },
];
