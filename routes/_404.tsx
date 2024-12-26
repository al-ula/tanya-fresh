import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="flex flex-col items-center mx-auto mb-2 pb-2 w-full">
        <div class="prose prose-md my-4">
          <h1>404 - Page not found</h1>
        </div>
      </div>
    </>
  );
}
