import { type Signal, signal } from "@preact/signals";
import { DEFAULT_THEME } from "../theme-config.ts";
import themes from "../theme-config.ts";

export const theme = signal(DEFAULT_THEME) as Signal<
  typeof DEFAULT_THEME | typeof themes.DARK | typeof themes.LIGHT
>;
