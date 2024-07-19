import { ReactNode } from "react";
import { redirect } from "next/navigation";
import SettingsNav from "./nav";

export default async function SettingsLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  
  return <div className="flex w-full flex-col">
    <SettingsNav />
    <div className="flex w-full flex-col p-4 ">

    {children}
    </div>

    </div>;
}
