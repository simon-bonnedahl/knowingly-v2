
import * as React from "react";
import {  preloadQuery } from "convex/nextjs";

import { api } from "@knowingly/backend/convex/_generated/api";
import { BlogpostsTable } from "./table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Knowingly Admin",
  description:
    " Knowingly is a platform for connecting you with the right person to help you solve your problem.",
  metadataBase: new URL("https://knowingly.dev"),
};


export default async function KnowinglyAdminBlogPage() {
  const preloadedBlogposts = await preloadQuery(api.blogPosts.list)


  return (
    <div className="flex w-full flex-col space-y-12  p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">Blog posts</h1>
        </div>
        <BlogpostsTable preloaded={preloadedBlogposts} />
      </div>
    </div>
  );
}
