"use client"

import * as React from "react"
import { InstantMeeting } from "./instant-meetings";




export default function MeetingsPage() {
    
    return (
      <div className="flex max-w-screen-xl flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Meetings
          </h1>
          
        </div>
        <InstantMeeting/>
        
  
      
      
      </div>
    </div>
    );
  }
  
