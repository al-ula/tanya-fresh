import { type Signal, signal } from "@preact/signals";
import { DEFAULT_THEME } from "../theme-config.ts";
import themes from "../theme-config.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const theme = signal(DEFAULT_THEME) as Signal<
  typeof DEFAULT_THEME | typeof themes.DARK | typeof themes.LIGHT
>;

export function loadTheme() {
  if (!IS_BROWSER) return;
  const storedTheme = document.cookie.split(";").find((c) =>
    c.startsWith("theme=")
  )?.split("=")[1];
  console.log(storedTheme);
  if (storedTheme) {
    return storedTheme;
  } else {
    return DEFAULT_THEME;
  }
}
