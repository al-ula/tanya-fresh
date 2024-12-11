import { type PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import { Nav } from "../islands/Nav.tsx";
import { theme } from "../signals/theme.ts";
import themes from "../theme-config.ts";
const { DARK: dark, LIGHT: light } = themes;

export default function App({ Component, state, route }: PageProps) {
  const themeState = state.theme === dark ? dark : light;
  theme.value = themeState === dark ? dark : light;
  const currentTheme = theme.value;
  return (
    <html data-theme={currentTheme}>
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tanya</title>
      </head>
      <body f-client-nav>
        <Nav theme_state={currentTheme} route={route} />
        <div class="mx-auto p-2 w-screen">
          <Partial name="body">
            <Component />
          </Partial>
        </div>
      </body>
    </html>
  );
}
