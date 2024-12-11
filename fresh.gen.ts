// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $CardActionLogin from "./islands/CardActionLogin.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Nav from "./islands/Nav.tsx";
import * as $SignupCard from "./islands/SignupCard.tsx";
import * as $ThemeToggle from "./islands/ThemeToggle.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/CardActionLogin.tsx": $CardActionLogin,
    "./islands/Counter.tsx": $Counter,
    "./islands/Nav.tsx": $Nav,
    "./islands/SignupCard.tsx": $SignupCard,
    "./islands/ThemeToggle.tsx": $ThemeToggle,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
