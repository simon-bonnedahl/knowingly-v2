import { ReactNode } from "react";
import SettingsNav from "./nav";

export default  function SettingsLayout({
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
