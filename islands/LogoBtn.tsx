export default function LogoBtn() {
  return (
    <button
      class="hover:bg-transparent hover:shadow-md hover:shadow-base-content/10 btn btn-ghost prose prose-2xl"
      onClick={() => {
        document.location.href = "/";
      }}
    >
      <span>
        TANYA<span class="text-base-content">!</span>
      </span>
      <sub class="text-sm">
        by <a class="no-underline" href="https://iisa.me">iisa</a>
      </sub>
    </button>
  );
}
