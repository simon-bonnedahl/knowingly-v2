
import * as React from "react";
import {  preloadQuery } from "convex/nextjs";

import { api } from "@knowingly/backend/convex/_generated/api";
import { UsersTable } from "./table";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Users | Knowingly Admin",
  description:
    " Knowingly is a platform for connecting you with the right person to help you solve your problem.",
  metadataBase: new URL("https://knowingly.dev"),
};

export default async function KnowinglyAdminUsersPage() {
  const preloadedUsers = await preloadQuery(api.users.list)


  return (
    <div className="flex w-full flex-col space-y-12  p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">Users</h1>
        </div>
        <UsersTable preloaded={preloadedUsers} />
      </div>
    </div>
  );
}
