import Card from "../components/Card.tsx";
import { deleteName, loadName, registerName } from "../signals/registerName.ts";
import { useEffect } from "preact/hooks";

export default function SignupCard() {
  useEffect(() => {
    const name = loadName();
    console.log("name: ", name);
    if (name === null) {
      globalThis.location.href = "/";
    } else {
      registerName.value = name;
    }
  }, []);

  return (
    <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
      <Card.Body>
        <Card.Title class="justify-center">Signup</Card.Title>
        <form className="flex flex-col mt-4 card-actions">
          <div class="bg-base-200 shadow-base-content/10 shadow-md my-2 mb-4 p-4 rounded-md w-full">
            <label class="mr-2 w-max" for="name">Name:</label>
            <input
              id="name"
              class="bg-transparent"
              value={registerName.value}
              disabled
            />
          </div>
          <a
            class="mx-auto w-max btn btn-primary"
            href="/"
            onClick={deleteName}
          >
            <h1>G</h1>Continue with Google
          </a>
          <div class="divider">or</div>
          <div class="flex-1 gap-2 grid grid-cols-2 w-full">
            <input
              type="email"
              placeholder="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              class="bg-base-200 shadow-base-content/10 shadow-md min-w-0 text-base-content placeholder:text-base-content/50 cols-1 input"
              required
            />
          </div>
          <button
            type="submit"
            className="shadow-base-content/10 shadow-md w-full text-base-content hover:animate-pulse btn btn-ghost"
          >
            Continue
          </button>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
