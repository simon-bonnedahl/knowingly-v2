"use memo"

import * as React from "react"


import { InvitesTable } from "./table";
import { api } from "@knowingly/backend/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";





export default async function AdminInvitesPage({params} : {params: {domain: string}}) {

  const subdomain = params.domain.split(".")[0];
  if(!subdomain) return null;
  const preloadedInvites = await preloadQuery(api.hubs.getInvites, { subdomain});

  

    
    return (
      <div className="flex  flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Invites
          </h1>
          
        </div>
        <InvitesTable preloaded={preloadedInvites} />
        
  
      
      
      </div>
    </div>
    );
  }
  





