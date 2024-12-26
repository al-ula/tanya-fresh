// deno-lint-ignore-file no-explicit-any
import { type Config } from "tailwindcss";
import daisyui from "daisyui";
import catppuccin from "@catppuccin/daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
    "static/**/*.svg",
  ],
  plugins: [
    daisyui as any,
    typography,
  ],
  daisyui: {
    themes: [
      catppuccin("latte"),
      catppuccin("mocha"),
      "light",
      "dark",
    ],
  },
} satisfies Config;
