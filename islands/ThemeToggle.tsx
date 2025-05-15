import { useEffect, useState } from "preact/hooks";
import themes, { DEFAULT_THEME } from "../theme-config.ts";
import { theme } from "../signals/theme.ts";
import Sun from "../components/svg/sun.tsx";
import Moon from "../components/svg/moon.tsx";
const { DARK: dark, LIGHT: light } = themes;

interface ThemeToggleProps {
  theme_state: typeof dark | typeof light | typeof DEFAULT_THEME;
  class?: string;
}

export default function ThemeToggle(props: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(props.theme_state === dark);

  // Initial setup
  useEffect(() => {
    if (document.cookie.match(/theme=([^;]+)/) === null) {
      const systemTheme =
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches
          ? dark
          : light;

      setIsDark(systemTheme === dark);
      theme.value = systemTheme;
    }
  }, []);

  // Handle theme changes
  useEffect(() => {
    const newTheme = isDark ? dark : light;
    theme.value = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    globalThis.document.cookie = `theme=${newTheme}; path=/`;
  }, [isDark]);

  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <label
      class={"swap-rotate btn btn-circle btn-ghost swap " + props.class}
    >
      <input
        type="checkbox"
        class="theme-controller"
        checked={isDark}
        onChange={handleToggle}
      />

      {/* sun icon */}
      <Sun class="fill-current swap-off w-10 h-10" />

      {/* moon icon */}
      <Moon class="fill-current swap-on w-10 h-10" />
    </label>
  );
}
