import { ReactNode } from "react";

import { AssistantModal } from "@knowingly/ui/assistant/assistant-modal";


export default function HubLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-screen  w-full flex-col overflow-y-scroll ">
        <AssistantModal />

      {children}
    </div>
  );
}
