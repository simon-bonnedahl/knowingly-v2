import { ReactNode } from "react";

import { EditorProvider } from "./editor-provider";
import { EditorSidebar } from "./editor-sidebar";
import { Separator } from "@knowingly/ui/separator";

export default function AdminEmailsLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  return (
    <EditorProvider>
      <div className="flex flex-col  py-2 h-full space-y-6 ">
        <h1 className="font-cal text-3xl font-bold text-foreground">Emails</h1>
        <div className="flex h-full gap-4  p-4 ">


        {children}
        <Separator orientation="vertical"  />
        <EditorSidebar />
        </div>
        

      </div>
    </EditorProvider>
  );
}


