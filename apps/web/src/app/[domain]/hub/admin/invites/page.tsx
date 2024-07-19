"use client"
"use memo"

import * as React from "react"


import { InvitesTable } from "./table";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams } from "next/navigation";





export default function AdminMembersPage() {
  const { domain } = useParams();
  const subdomain = decodeURIComponent(domain as string).split(".")[0];

  const invites = useQuery(api.hubs.getInvites, { subdomain: subdomain as string});

  

    
    return (
      <div className="flex  flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Invites
          </h1>
          
        </div>
        <InvitesTable data={invites} />
        
  
      
      
      </div>
    </div>
    );
  }
  





