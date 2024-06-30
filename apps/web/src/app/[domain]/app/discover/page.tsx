"use server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@knowingly/backend/convex/_generated/api";
import HubCard from "~/components/hub-card";


export default async function DiscoverHubsPage() {
 const hubs = await fetchQuery(api.hubs.getPublicHubs)
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Discover Hubs
          </h1>
          
        </div>
        {/* <Input placeholder="Search" /> */}

      
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {hubs.map((hub) => (
                <HubCard key={hub._id} hub={hub} />
              ))
              }
            </div>
      </div>
    </div>
  );
}
