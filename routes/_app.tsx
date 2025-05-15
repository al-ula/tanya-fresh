import { type PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import { Nav } from "../components/Nav.tsx";
import { theme } from "../signals/theme.ts";
import themes from "../theme-config.ts";
import Language from "../islands/Language.tsx";
const { DARK: dark, LIGHT: light } = themes;

export default function App({ Component, state, route }: PageProps) {
  const lang: string = state.lang === "id" ? "id" : "en-US";

  const themeState = state.theme === dark ? dark : light;
  theme.value = themeState === dark ? dark : light;
  const currentTheme = theme.value;

  return (
    <html data-theme={currentTheme} lang={lang}>
      <head>
        <link rel="icon" type="image/x-icon" href="/qna-logo-1024.png" />
        <link rel="stylesheet" href="/styles.css" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tanya!</title>
        <Language />
      </head>
      <body
        f-client-nav
        class="w-full"
      >
        <Nav theme_state={currentTheme} route={route} />
        <div class="mx-auto p-2">
          <Partial name="body">
            <Component />
          </Partial>
        </div>
      </body>
    </html>
  );
}
