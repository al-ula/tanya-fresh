import Card from "../components/Card.tsx";
import {
  Message,
  MessageTitle,
  Reply,
  ReplyBubble,
  ReplyRoot,
} from "../components/MessageCards.tsx";
import { Pagination } from "../components/Pagination.tsx";

export default function MessageCard() {
  const currentPage = 3;
  return (
    <Card.Root class="bg-base-200 my-2 w-full max-w-xl text-base-content">
      <Card.Body class="flex flex-col h-max w-full items-center justify-center">
        <Pagination page={currentPage} totalPages={3} class={"mb-6"} />
        <Message>
          <MessageTitle class="bg-base-200 text-base-content/70 prose prose-sm prose-zinc shadow-md">
            You are now in the island
          </MessageTitle>
          <ReplyRoot>
            <Reply class={"gap-2 flex flex-col"}>
              <ReplyBubble
                deletable
                class="bg-base-200 text-base-content/70 prose prose-sm prose-zinc shadow-md align-text-bottom"
              >
                You underestimate my power!
              </ReplyBubble>
              <ReplyBubble
                deletable
                class="bg-base-200
                text-base-content/70
                prose prose-sm prose-zinc shadow-md
                align-text-bottom"
              >
                I want you
              </ReplyBubble>
            </Reply>
          </ReplyRoot>
        </Message>
        <Pagination page={currentPage} totalPages={3} class={"mt-6"} />
      </Card.Body>
    </Card.Root>
  );
}
