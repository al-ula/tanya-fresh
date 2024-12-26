import * as crossJwt from "@cross/jwt";

export const JWTSECRET = Deno.env.get("JWT_KEY") ?? (() => {
  throw new Error("JWT_KEY environment variable is required");
})();

export interface JWT {
  iss: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;

  board: string;
}

export function generateJWT(user: string, board: string) {
  const payload: JWT = {
    iss: "https://tanya.iisa.me",
    sub: user,
    exp: (Date.now() / 1000) + 60 * 60 * 24 * 30,
    nbf: (Date.now() / 1000),
    iat: (Date.now() / 1000),
    board,
  };
  return crossJwt.signJWT(payload, JWTSECRET, {
    validateExp: true,
    validateNbf: true,
  });
}

export async function verifyJWT(token: string): Promise<JWT | null> {
  if (!token) {
    return null;
  }

  const payload = await crossJwt.validateJWT(token, JWTSECRET, {
    validateExp: true,
    validateNbf: true,
  });
  if (!payload) {
    return null;
  }
  return payload as JWT;
}

export async function getUserFromJWT(token: string) {
  if (!token) {
    return null;
  }
  const payload = await verifyJWT(token);
  if (!payload) {
    return null;
  }
  return payload.sub;
}

export async function getBoardFromJWT(token: string) {
  if (!token) {
    return null;
  }
  const payload = await verifyJWT(token);
  if (!payload) {
    return null;
  }
  return payload.board;
}
