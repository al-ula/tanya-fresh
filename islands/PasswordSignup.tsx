import { deleteName, registerName } from "../signals/registerName.ts";
import { useRef } from "preact/hooks";
const PASSVALIDATE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]{8,100}$/;

interface locale {
  "name": string;
  "continueButton": string;
  "or": string;
  "cancelButton": string;
}

export default function PasswordSignup(locale: locale) {
  // Add refs for the form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // Add form submit handler
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);

      if (!PASSVALIDATE.test(password)) {
        alert(
          "Password must contain at least:\n" +
            "- 8 characters\n" +
            "- One uppercase letter\n" +
            "- One lowercase letter\n" +
            "- One number\n" +
            "- One special character",
        );
        return;
      }

      const userData = {
        name,
        email,
        password,
      };

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        deleteName(); // Delete the name after successful submission
        // globalThis.location.href = "/"; // Redirect to home page
      } else {
        const errorData = await res.json();
        alert(errorData.error || `Error: ${res.status} ${res.statusText}`);
      }

      deleteName(); // Delete the name after successful submission
      // globalThis.location.href = "/"; // Redirect to home page
    }
  };
  return (
    <form
      className="flex flex-col mt-2 card-actions"
      onSubmit={handleSubmit} // Add onSubmit handler
    >
      <div class="hidden bg-base-200 shadow-base-content/10 shadow-md my-2 mb-4 p-4 rounded-md w-full">
        <label class="mr-2 w-max" for="name">Name:</label>
        <input
          id="name"
          ref={nameRef}
          class="bg-transparent"
          value={registerName.value}
          disabled
        />
      </div>
      <div class="divider">{locale["or"]}</div>
      <div class="flex-1 gap-2 grid grid-cols-2 w-full">
        <input
          ref={emailRef} // Add ref
          type="email"
          placeholder="Email"
          title="Please enter a valid email address"
          class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
          required
        />
        <input
          ref={passwordRef} // Add ref
          type="password"
          placeholder="Password"
          title="Password must contain at least:
            - 8 characters
            - One uppercase letter
            - One lowercase letter
            - One number
            - One special character"
          class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
          required
        />
      </div>
      <button
        type="submit"
        className="shadow-base-content/10 shadow-md w-full text-base-content hover:animate-pulse btn btn-ghost"
      >
        {locale["continueButton"]}
      </button>
    </form>
  );
}
