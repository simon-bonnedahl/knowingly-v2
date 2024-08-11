import { ReactNode } from "react";

import { AssistantModal } from "@knowingly/ui/assistant/assistant-modal";
import { fetchQuery } from "convex/nextjs";
import { api } from "@knowingly/backend/convex/_generated/api";
import { AIAssistantProvider } from "../AIAssistantProvider";
import { auth } from "@clerk/nextjs/server";
import { DesktopNavbar } from "./desktop-navbar";
import { cn } from "@knowingly/ui";



export default async function HubLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const {userId} = auth();
  const aiChatFlag = await fetchQuery(api.flags.get, {key: "feature_ai_chat"})
  return (
    <AIAssistantProvider>

    <div className={cn("relative flex h-screen  w-full flex-col overflow-y-scroll ")}>
        {(aiChatFlag && userId) && <AssistantModal />}
      {!userId && (
       <DesktopNavbar />

      )}
      {children}
    </div>
    </AIAssistantProvider>
  );
}
