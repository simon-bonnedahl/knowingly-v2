"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import HubAdminNav from "./nav";
import { Button, buttonVariants } from "@knowingly/ui/button";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";

export default function HubAdminLayout({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const subdomain = useSubdomain();

  const user = useQuery(api.users.getMe);
  const userRole = useQuery(api.hubs.getMyRole, { subdomain });

  if(!user || (!userRole && user?.role !== "SUPERUSER")) {
    return null;
  }

  if (!userRole?.permissions.canSeeAdminPanel && user?.role !== "SUPERUSER") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="relative mx-auto h-24 w-24 rounded-full bg-primary/10 p-4">
            <Icons.userShield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unauthorized
          </h1>
          <p className="mt-4 text-muted-foreground">
            You don't have the necessary permissions to access this page. Please
            contact your hub admin or support.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Go back
            </Link>
            <Button variant="outline">
              <Icons.mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col  ">
      <HubAdminNav />
      <div className="flex h-full w-full flex-col p-4 ">{children}</div>
    </div>
  );
}
