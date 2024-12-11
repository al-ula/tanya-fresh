import Card from "../components/Card.tsx";

export default function Login() {
  return (
    <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-center mb-4">Login</Card.Title>
          <a class="mx-auto w-max btn btn-primary" href="/">
            <h1>G</h1>Continue with Google
          </a>
          <div class="divider">or</div>
          <form className="flex flex-col mt-4 card-actions">
            <div class="flex-1 gap-2 grid grid-cols-2 w-full">
              <input
                type="text"
                placeholder="Email"
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
              className="shadow-base-content/10 shadow-md w-full text-base-conten hover:animate-pulse btn btn-ghost"
            >
              Continue
            </button>
          </form>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
