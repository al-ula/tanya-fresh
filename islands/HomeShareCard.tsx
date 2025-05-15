import { IS_BROWSER } from "$fresh/runtime.ts";
import Card from "../components/Card.tsx";
import { useState } from "preact/hooks";
import CopyIcon from "../components/svg/copy.tsx";

interface ShareCardProps {
  boardId: string | null;
}

export default function ShareCard(prop: ShareCardProps) {
  const [showToast, setShowToast] = useState(false);
  const pageLink = `https://tanya.iisa.me/b/${prop.boardId}`;

  if (!prop.boardId && IS_BROWSER) {
    alert("Default board not found");
  }
  if (prop.boardId === "" && IS_BROWSER) {
    alert("Default board not found");
  }

  function onCopyBtnClick() {
    navigator.clipboard.writeText(pageLink)
      .then(() => {
        setShowToast(true);
        // Hide toast after 2 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      });
  }

  return (
    <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
      <Card.Body class="flex flex-row h-max w-full items-center justify-center">
        {showToast && (
          <div class="toast toast-top toast-center">
            <div class="alert alert-info text-sm">
              <span>Link copied to clipboard!</span>
            </div>
          </div>
        )}
        <div class="bg-base-300 shrink flex-1 text-base-content/50 prose prose-sm prose-zinc shadow-md mr-2 rounded-md justify-center items-center py-2 px-4 h-12 truncate">
          <div class="h-full flex items-center">
            <p>
              {globalThis.innerWidth > 358
                ? pageLink
                : `https://tanya.../b/${prop.boardId}`}
            </p>
          </div>
        </div>
        <div
          class={`justify-center
            p-3 hover:bg-transparent
            hover:shadow-md
            hover:shadow-base-content/10
            btn btn-ghost h-12 w-12`}
          onClick={onCopyBtnClick}
        >
          <CopyIcon class={"fill-base-content/60 w-full h-full"} />
        </div>
      </Card.Body>
    </Card.Root>
  );
}
