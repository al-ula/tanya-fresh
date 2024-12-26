import { useState } from "preact/hooks";
import { saveName } from "../signals/registerName.ts";
import { Language } from "../locale/index.ts";
import LoginIcon from "../components/svg/login.tsx";

export interface CardLocaleContent {
  "name--placeholder": string;
  "button-label": string;
}

export interface CardLocaleMap {
  [Language.ID]: CardLocaleContent;
  [Language.EN]: CardLocaleContent;
}

interface CardActionLoginProps {
  locale: CardLocaleContent;
}

export default function CardActionLogin(props: CardActionLoginProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    saveName(value);
    globalThis.location.href = "/signup";
  };
  return (
    <form
      className="flex flex-row mt-4 card-actions"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={props.locale["name--placeholder"]}
        class="flex-1 bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 input"
        required
      />
      <button
        type="submit"
        class="shadow-base-content/10 shadow-md text-base-conten hover:animate-pulse btn btn-square btn-ghost"
      >
        <LoginIcon
          class="stroke-current w-7 h-7"
          aria-label={props.locale["button-label"]}
        />
      </button>
    </form>
  );
}
