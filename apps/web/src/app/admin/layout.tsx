import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TooltipProvider } from "@knowingly/ui/tooltip";
import { api } from "@knowingly/backend/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {

    const userId = auth().userId
    const user = await fetchQuery(api.users.getByTokenIdentifier, { tokenIdentifier: userId as string });

    const hubs = await fetchQuery(api.hubs.getHubs)

    console.log(user);

    // console.log(user);

    // if (!user || user.role !== "SUPERUSER") {
    //     return <div>
    //         <h1>Not authorized</h1>
    //     </div>
    // } 

  return (
    <TooltipProvider>
      
        <Sidebar />
        <main className="ml-10 p-4 overflow-y-auto">
          {children}
        </main>
    </TooltipProvider>
  );
}
