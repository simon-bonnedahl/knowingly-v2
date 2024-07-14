import { ReactNode } from "react";
import { redirect } from "next/navigation";
import HubAdminNav from "./nav";

export default async function HubAdminLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  
  return <div className="flex w-full flex-col">
    <HubAdminNav />
    <div className="flex w-full flex-col p-4 ">

    {children}
    </div>

    </div>;
}
