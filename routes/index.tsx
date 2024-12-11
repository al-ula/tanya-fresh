import CardActionLogin from "../islands/CardActionLogin.tsx";
import Card from "../components/Card.tsx";

export default function Home() {
  return (
    <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-center mb-2">
            <h2>Secret Message Book</h2>
          </Card.Title>
          <ul class="list-disc list-inside">
            <li>Get anonymous feedback from your Friends & Coworkers.</li>
            <li>
              Improve your Friendship by discovering your Strengths and areas
              for Improvement
            </li>
          </ul>
        </Card.Body>
      </Card.Root>
      <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
        <Card.Body>
          <Card.Title class="justify-start mb-2">
            <h3>Create book</h3>
          </Card.Title>
          <CardActionLogin />
          <p>
            Already have an account?{" "}
            <a href="/login" class={"btn btn-sm btn-ghost text-accent !p-1"}>
              Login
            </a>
          </p>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
