import ThemeToggle from "../islands/ThemeToggle.tsx";
import { theme } from "../signals/theme.ts";
import themes, { DEFAULT_THEME } from "../theme-config.ts";

const { DARK: dark, LIGHT: light } = themes;

interface NavProps {
  theme_state: typeof dark | typeof light | typeof DEFAULT_THEME;
  route: string;
}

export function Nav(prop: NavProps) {
  const { route, theme_state } = prop;
  console.log("Route: ", route);
  const themeState = theme_state === dark ? dark : light;
  theme.value = themeState;
  return (
    <div class="bg-base-300 text-base-content navbar">
      <div class="navbar-start">
        {/* <a class="btn btn-ghost prose prose-2xl" href="/"></a> */}
      </div>
      <div class="navbar-center">
        <a
          class="hover:bg-transparent hover:shadow-md hover:shadow-base-content/10 btn btn-ghost prose prose-2xl"
          href="/"
        >
          <span>
            TANYA<span class="text-base-content">!</span>
          </span>
          <sub class="text-sm">
            by <a class="no-underline" href="https://iisa.me">iisa</a>
          </sub>
        </a>
      </div>
      <div class="navbar-end">
        <ThemeToggle theme_state={themeState} className="scale-[0.6]" />
      </div>
    </div>
  );
}
