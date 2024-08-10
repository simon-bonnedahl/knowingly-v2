"use memo"

import * as React from "react"


import { api } from "@knowingly/backend/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { RequestsTable } from "./table";





export default async function AdminRequestsPage({params} : {params: {domain: string}}) {

  const subdomain = params.domain.split(".")[0];
  if(!subdomain) return null;
  const preloadedRequests = await preloadQuery(api.inviteRequests.list, { subdomain});

  

    
    return (
      <div className="flex  flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Requests
          </h1>
          
        </div>
        <RequestsTable preloaded={preloadedRequests} />
        
  
      
      
      </div>
    </div>
    );
  }
  





