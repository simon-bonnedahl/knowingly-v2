import { api } from "@knowingly/backend/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { SupportTicketTable } from "./table";


export default async function KnowinglyAdminSupportPage() {
    const preloadedTickets = await preloadQuery(api.supportTickets.list)


  return (
    <div className="flex w-full flex-col space-y-12  p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">Hubs</h1>
        </div>
        <SupportTicketTable preloaded={preloadedTickets} />
      </div>
    </div>
  );
}
