import Card from "../components/Card.tsx";
import GoogleAuth from "./GoogleAuth.tsx";
import { useEffect, useRef } from "preact/hooks";
import { Language } from "../locale/index.ts";
import { GoogleSigninBody } from "../types/login-api.ts";

export interface LocaleContent {
  "continueButton": string;
  "or": string;
}

export interface Locale {
  [Language.ID]: LocaleContent;
  [Language.EN]: LocaleContent;
}

interface loginCardProps {
  gis_client_id: string;
  locale: LocaleContent;
}
export default function LoginCard(props: loginCardProps) {
  // Add refs for the form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const locale: LocaleContent = props.locale;

  useEffect(() => {
    // deno-lint-ignore no-explicit-any
    (globalThis as any).handleGoogle = handleGoogle;
  }, []);

  // deno-lint-ignore no-explicit-any
  async function handleGoogle(response: any): Promise<void> {
    try {
      const signinBody: GoogleSigninBody = {
        type: "google",
        id_token: response.credential,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      try {
        const signinResponse = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinBody),
          signal: controller.signal,
        });

        if (signinResponse.status !== 200) {
          const errorData = await signinResponse.json();
          throw new Error(errorData.error);
        }
        // Success case
        console.log("Signin successful");
        // TODO: Redirect to home page
        globalThis.location.href = "/";
      } catch (fetchError: unknown) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          throw new Error("Request timed out. Please try again.");
        }
        throw fetchError;
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Unknown error occurred";
      alert(`Login failed: ${errorMessage}`);
    }
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("handleSubmit");
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("email: ", email);
    console.log("password: ", password);
    if (email && password) {
      alert(`Email: ${email}\nPassword: ${password}`);
      globalThis.location.href = "/";
    }
  };
  return (
    <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
      <Card.Body>
        <Card.Title class="justify-center mb-4">Login</Card.Title>
        <div className={"mx-auto w-max"}>
          <GoogleAuth
            class="w-max mx-auto"
            callback={handleGoogle}
            clientId={props.gis_client_id}
          />
        </div>
        <div class="divider hidden">{locale["or"]}</div>
        <form
          class="flex flex-col mt-4 card-actions hidden"
          onSubmit={handleSubmit}
        >
          <div class="flex-1 gap-2 grid grid-cols-2 w-full">
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
              required
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
              required
            />
          </div>
          <button
            type="submit"
            class="shadow-base-content/10 shadow-md w-full text-base-conten hover:animate-pulse btn btn-ghost"
          >
            {locale["continueButton"]}
          </button>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
