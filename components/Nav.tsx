import ThemeToggle from "../islands/ThemeToggle.tsx";
import themes, { DEFAULT_THEME } from "../theme-config.ts";
import LogoBtn from "../islands/LogoBtn.tsx";
import LogoutBtn from "../islands/LogoutBtn.tsx";

const { DARK: dark, LIGHT: light } = themes;

interface NavProps {
  theme_state: typeof dark | typeof light | typeof DEFAULT_THEME;
  route: string;
}

export function Nav(prop: NavProps) {
  const { route, theme_state } = prop;
  console.log("Route: ", route);

  return (
    <div class="bg-base-300 text-base-content navbar">
      <div class="navbar-start">
        {/* <a class="btn btn-ghost prose prose-2xl" href="/"></a> */}
      </div>
      <div class="navbar-center">
        <LogoBtn />
      </div>
      <div class="navbar-end">
        <ThemeToggle theme_state={theme_state} class="scale-[0.6]" />
        <LogoutBtn route={route} />
      </div>
    </div>
  );
}
