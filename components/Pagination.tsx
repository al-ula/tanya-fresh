export function Pagination(
  { page, totalPages, ...props }:
    & { page: number; totalPages: number }
    & preact.JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div {...props}>
      <div class="join">
        <button
          class={`join-item btn btn-outline btn-accent btn-xs ${
            page === 1 ? "invisible" : ""
          }`}
        >
          ◂
        </button>
        <button class="join-item btn btn-outline btn-accent btn-xs min-w-12">
          {page}
        </button>
        <button
          class={`join-item btn btn-outline btn-accent btn-xs ${
            page === totalPages ? "invisible" : ""
          }`}
        >
          ▸
        </button>
      </div>
    </div>
  );
}
