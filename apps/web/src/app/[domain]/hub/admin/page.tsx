"use client"

import * as React from "react"
import { MeetingsBarChart } from "~/components/charts/meetings-bar-chart";
import { MostVisitedChart } from "~/components/charts/most-visited-chart";
import { RadialChart } from "~/components/charts/radial-chart";
import { SubrolesChart } from "~/components/charts/subroles-chart";
import { UserActivityChart } from "~/components/charts/user-activity-chart";
import { VisitorsChart } from "~/components/charts/visitors-chart";




export default function AdminDashboardPage() {
    
    return (
      <div className="flex max-w-screen-xl flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Dashboard
          </h1>
          
        </div>
        <div className="lg:grid  lg:grid-cols-2 xl:grid-cols-3 gap-2 flex flex-col">
        <VisitorsChart />
        {/* <TotalUsersChart /> */}
        <RadialChart value={250} maxValue={300} title="Users" description="Amount of users in your hub" label="Users" />
        <SubrolesChart />
      </div>
      <MeetingsBarChart/>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 ">
        <UserActivityChart />
        <MostVisitedChart />
      </div>
        
  
      
      
      </div>
    </div>
    );
  }
  
