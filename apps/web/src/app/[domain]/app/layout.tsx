import { ReactNode } from "react";

export default function AppLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-screen  w-full flex-col overflow-y-scroll ">
      {children}
    </div>
  );
}
