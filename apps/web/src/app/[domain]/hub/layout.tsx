import { ReactNode } from "react";

import { AssistantModal } from "@knowingly/ui/assistant/assistant-modal";
import { fetchQuery } from "convex/nextjs";
import { api } from "@knowingly/backend/convex/_generated/api";
import { AIAssistantProvider } from "../AIAssistantProvider";
import { DesktopNavbar } from "./desktop-navbar";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";


export default async function HubLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const authToken = convexAuthNextjsToken();
  const aiChatFlag = await fetchQuery(api.flags.get, {key: "feature_ai_chat"})
  return (
    <AIAssistantProvider>

    <div className="relative flex h-screen  w-full flex-col overflow-y-scroll ">
        {(aiChatFlag && authToken) && <AssistantModal />}
      {!authToken && (
       <DesktopNavbar />

      )}
      {children}
    </div>
    </AIAssistantProvider>
  );
}
