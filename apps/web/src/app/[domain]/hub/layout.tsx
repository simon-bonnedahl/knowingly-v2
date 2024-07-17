import { ReactNode } from "react";
import { AssistantModal } from "@knowingly/ui/assistant/assistant-modal";


export default async function HubLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  



  return (
    
       
          <div className="flex flex-col w-full  h-screen overflow-y-scroll relative">
            <AssistantModal />
          {/* <div className="w-full h-8 top-2 left-2 absolute  z-30 ">
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
            </div> */}
          {children}
        </div>
  );
}
