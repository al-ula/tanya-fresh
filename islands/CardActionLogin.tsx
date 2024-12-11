import { useState } from "preact/hooks";
import { saveName } from "../signals/registerName.ts";

export default function CardActionLogin() {
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
        placeholder="Your name..."
        class="flex-1 bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 input"
        required
      />
      <button
        type="submit"
        className="shadow-base-content/10 shadow-md text-base-conten hover:animate-pulse btn btn-ghost"
      >
        Continue
      </button>
    </form>
  );
}
