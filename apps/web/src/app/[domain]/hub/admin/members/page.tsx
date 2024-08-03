"use memo"

import * as React from "react"


import { MembersTable } from "./table";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams } from "next/navigation";
import { preloadQuery } from "convex/nextjs";





export default async function AdminMembersPage({params} : {params: {domain: string}}) {
  const subdomain = params.domain.split(".")[0];
  const preloadedMembers = await preloadQuery(api.hubs.getMembers, { subdomain: subdomain as string});

  

    
    return (
      <div className="flex w-full flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Members
          </h1>
          
        </div>
        <MembersTable preloaded={preloadedMembers} />
        
  
      
      
      </div>
    </div>
    );
  }
  





