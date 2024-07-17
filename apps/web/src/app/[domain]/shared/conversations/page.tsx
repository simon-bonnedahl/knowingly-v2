import { cookies } from "next/headers";
import { ChatLayout } from "~/components/chat/chat-layout";

export default function ConversationsPage() {
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