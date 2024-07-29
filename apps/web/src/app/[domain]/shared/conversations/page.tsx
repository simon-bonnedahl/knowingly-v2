
import { cookies } from "next/headers";


import { ChatLayout } from "~/components/chat/chat-layout";

export default function ConversationsPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="flex h-[99vh] w-full flex-col  items-center justify-center gap-4">
      <div className="z-10  h-full  w-full rounded-lg text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
