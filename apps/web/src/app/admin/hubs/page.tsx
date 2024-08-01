"use memo";

import * as React from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import { HubsTable } from "./table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubs | Knowingly Admin",
  description:
    " Knowingly is a platform for connecting you with the right person to help you solve your problem.",
  metadataBase: new URL("https://knowingly.dev"),
};

export default async function KnowinglyAdminHubsPage() {
  const preloadedHubs = await preloadQuery(api.hubs.list)


  return (
    <div className="flex w-full flex-col space-y-12  p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">Hubs</h1>
        </div>
        <HubsTable preloaded={preloadedHubs} />
      </div>
    </div>
  );
}
