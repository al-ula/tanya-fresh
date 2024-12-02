import { type PageProps } from "$fresh/server.ts";
import { theme } from "../signals/theme.ts";
import themes from "../theme-config.ts";
const { DARK: dark, LIGHT: light } = themes;

export default function App({ Component, state }: PageProps) {
  const userTheme = state.theme;
  theme.value = userTheme === dark ? dark : light;
  const currentTheme = theme.value;
  return (
    <html data-theme={currentTheme}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tanya</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
