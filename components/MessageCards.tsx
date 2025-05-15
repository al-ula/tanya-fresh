import Card from "../components/Card.tsx";
import ReplyDelBtn from "../islands/ReplyDelBtn.tsx";

export function Message({ children }: { children?: preact.ComponentChildren }) {
  return (
    <Card.Root class="bg-base-300
      w-full shrink
      flex-1
      text-base-content/50
      prose prose-sm prose-zinc
      shadow-md
      rounded-md
      justify-center
      items-center
      p-2">
      <Card.Body class="h-max w-full flex items-center p-4">
        {children}
      </Card.Body>
    </Card.Root>
  );
}

export function MessageTitle(
  { children, ...props }:
    & { children?: preact.ComponentChildren }
    & preact.JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      class={`${props.class || ""} w-full flex-1 rounded-md py-4 px-6`}
    >
      {children}
    </div>
  );
}

export function ReplyRoot(
  { children, ...props }:
    & { children?: preact.ComponentChildren }
    & preact.JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      class={`${props.class || ""} w-full`}
    >
      {children}
    </div>
  );
}

export function Reply(
  { children, ...props }:
    & { children?: preact.ComponentChildren }
    & preact.JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      class={`${props.class || ""} chat chat-end`}
    >
      {children}
    </div>
  );
}

export function ReplyBubble(
  { deletable, children, ...props }:
    & { deletable?: boolean }
    & { children?: preact.ComponentChildren }
    & preact.JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div class="flex flex-row gap-0.5">
      {deletable && <ReplyDelBtn />}
      <div
        {...props}
        class={`${props.class || ""} chat-bubble`}
      >
        {children}
      </div>
    </div>
  );
}
