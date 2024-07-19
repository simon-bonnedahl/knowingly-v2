import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { cookies } from "next/headers";
import { ChatLayout } from "~/components/chat/chat-layout";

export default async function ConversationsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return (
        <main className="flex flex-col items-center justify-center  w-full gap-4 h-[99vh]">
      
      <div className="z-10  rounded-lg  w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>

        
  
      
      
    </main>
    );
}