import { ReactNode } from "react";


export default async function SharedLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  



  return (
    
       
          <div className="flex flex-col w-full  h-screen overflow-y-scroll relative">
            
          {children}
        </div>
  );
}
