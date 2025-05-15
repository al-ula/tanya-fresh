import { deleteName, loadName, registerName } from "../signals/registerName.ts";
import Card from "../components/Card.tsx";
import { useEffect } from "preact/hooks"; // Add useRef import
import GoogleAuth from "./GoogleAuth.tsx";
import { Language } from "../locale/index.ts";
import { GoogleSignupBody } from "../types/signup-api.ts";

interface signupCardProps {
  gis_client_id: string;
  locale: LocaleContent;
}

export interface LocaleContent {
  "name": string;
  "continueButton": string;
  "or": string;
  "cancelButton": string;
}

export interface Locale {
  [Language.ID]: LocaleContent;
  [Language.EN]: LocaleContent;
}

export default function SignupCard({ gis_client_id, locale }: signupCardProps) {
  useEffect(() => {
    const name = loadName();
    console.log("name: ", name);
    if (name === null) {
      globalThis.location.href = "/";
    } else {
      registerName.value = name;
    }

    // deno-lint-ignore no-explicit-any
    (globalThis as any).handleGoogle = handleGoogle;
  }, []);

  // deno-lint-ignore no-explicit-any
  async function handleGoogle(response: any): Promise<void> {
    try {
      // Name validation
      const name = loadName()?.trim();
      if (!name) {
        throw new Error("NameError: Please enter your name");
      }
      if (!name || name.length < 2) {
        throw new Error(
          "NameError: Please enter a valid name (minimum 2 characters)",
        );
      }

      const signupBody: GoogleSignupBody = {
        type: "google",
        name,
        id_token: response.credential,
      };

      // Network request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const signupResponse = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupBody),
          signal: controller.signal,
        });

        // Parse error response
        if (signupResponse.status !== 201) {
          const errorData = await signupResponse.json();
          throw new Error(errorData.error);
        }

        // Success case
        console.log("Signup successful");
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

      deleteName();
    } catch (error: unknown) {
      console.error("Signup failed:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Unknown error occurred";
      alert(`Signup failed: ${errorMessage}`);

      deleteName();

      if (error instanceof Error && errorMessage.startsWith("NameError: ")) {
        globalThis.location.href = "/";
      }
    }
  }

  const handleCancel = (e: Event) => {
    e.preventDefault();
    deleteName();
    globalThis.location.href = "/";
  };

  return (
    <>
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-center">Signup</Card.Title>

          <div class="flex flex-row my-2 mb-4 w-full h-max">
            <div class="justify-center shadow-base-content/10 shadow-md mr-2 px-4 py-2 rounded-md w-full prose">
              <span class="text-base-content">{locale["name"]}{" "}</span>
              <span class="mx-2">{registerName.value}</span>
            </div>
            <button
              class="shadow-base-content/10 shadow-md w-max text-error hover:animate-pulse btn btn-ghost"
              onClick={handleCancel}
            >
              {locale["cancelButton"]}
            </button>
          </div>

          <GoogleAuth
            class="mx-auto w-max"
            callback={handleGoogle}
            clientId={gis_client_id}
          />
        </Card.Body>
      </Card.Root>
    </>
  );
}
