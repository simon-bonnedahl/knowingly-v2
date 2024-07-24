"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { useSearchParams, useRouter } from "next/navigation";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@knowingly/ui/tabs";

import { InstantMeeting } from "./instant-meetings";
import { MeetingCard } from "./meeting-card";

export default function MeetingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "upcoming";
  const [selectedTab, setSelectedTab] = React.useState(tab);

  const meetings = useQuery(api.meetings.list);
  const invites = useQuery(api.meetings.getInvites);

  const pastMeetings = meetings?.filter(
    (meeting) => new Date(meeting.endsAt).getTime() - Date.now() < 0
  );

  const upcomingMeetings = meetings?.filter(
    (meeting) => new Date(meeting.endsAt).getTime() - Date.now() > 0
  );

  React.useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="flex w-full flex-col space-y-12 p-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Meetings
          </h1>
        </div>
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex h-10 w-full gap-2">
            <TabsList className="grid h-full w-full grid-cols-3">
              <TabsTrigger value="upcoming" className="h-full flex gap-2 items-center">
                Upcoming
                {upcomingMeetings?.length > 0 && (
                  <span className="rounded-full bg-primary text-white px-2 text-xs font-normal">
                    {upcomingMeetings?.length
                    }
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="invites" className="h-full flex gap-2 items-center">
              Invites
                {invites?.length > 0 && (
                  <span className="rounded-full bg-primary text-white px-2 text-xs font-normal">
                    {invites?.length
                    }
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past" className="h-full flex gap-2 items-center">
              Past
                {pastMeetings?.length > 0 && (
                  <span className="rounded-full bg-primary text-white px-2 text-xs font-normal">
                    {pastMeetings?.length
                    }
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            <InstantMeeting />
          </div>

          <TabsContent value="upcoming" className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            {upcomingMeetings?.map((meeting) => (
              <MeetingCard key={meeting._id} meeting={meeting} />
            ))}
          </TabsContent>
          <TabsContent value="invites" className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            {invites?.map((invite) => (
              <MeetingCard key={invite._id} meeting={invite.meeting} />
            ))}
          </TabsContent>
          <TabsContent value="past" className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            {pastMeetings?.map((meeting) => (
              <MeetingCard key={meeting._id} meeting={meeting} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
