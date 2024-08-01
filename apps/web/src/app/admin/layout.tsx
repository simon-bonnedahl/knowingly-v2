import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TooltipProvider } from "@knowingly/ui/tooltip";
import { api } from "@knowingly/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Knowingly Admin",
  description:
    " Knowingly is a platform for connecting you with the right person to help you solve your problem.",
  metadataBase: new URL("https://knowingly.dev"),
};

export default async function KnowinglyAdminLayout({ children }: { children: ReactNode }) {

    const userId = auth().userId
    const user = await fetchQuery(api.users.getByTokenIdentifier, { tokenIdentifier: userId as string });




    if (!user || user.role !== "SUPERUSER") {
        return <div>
            <h1>Not authorized</h1>
        </div>
    } 
  return (
    <TooltipProvider>
      
        <Sidebar />
        <main className="ml-0 sm:ml-14 overflow-y-auto bg-card h-full">
          {children}
        </main>
    </TooltipProvider>
  );
}
