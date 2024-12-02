import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";
import { PageProps } from "$fresh/server.ts";
import { theme } from "../signals/theme.ts";
import themes from "../theme-config.ts";

const { DARK: dark, LIGHT: light } = themes;

export default function Home({ state }: PageProps) {
  const themeState = state.theme === dark ? dark : light;
    theme.value = themeState;
  const count = useSignal(3);
  return (
    <div class="bg-[#86efac] mx-auto px-4 py-8">
      <div class="flex flex-col justify-center items-center mx-auto max-w-screen-md">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="font-bold text-4xl">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
        <ThemeToggle theme_state={themeState} />
      </div>
    </div>
  );
}
