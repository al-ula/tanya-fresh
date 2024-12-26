import Cross from "../components/svg/cross.tsx";

export default function ReplyDelBtn() {
  return (
    <button
      class="btn btn-square btn-ghost btn-xs"
      aria-label="Reply"
    >
      <Cross class="fill-current" />
    </button>
  );
}
