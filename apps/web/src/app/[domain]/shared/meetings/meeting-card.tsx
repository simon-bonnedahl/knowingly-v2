"use client";
import { Ent } from "@knowingly/backend/convex/types";
import { Badge } from "@knowingly/ui/badge";
import { Card } from "@knowingly/ui/card";
import { Separator } from "@knowingly/ui/separator";
import React from "react";
import { formatDate, formatCountdown, formatTime } from "~/lib/dateUtils"
import AvatarCircles  from "@knowingly/ui/avatar-circles";
import { FunctionReturnType } from "convex/server";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "~/components/request-meeting/calendar/calendar-button";
import Link from "next/link";
import { buttonVariants } from "@knowingly/ui/button";
import { cn } from "@knowingly/ui";

interface MeetingCardProps {
    meeting: FunctionReturnType<typeof api.meetings.list>[0];
}
export const MeetingCard = ({ meeting} : MeetingCardProps) => {

    const timeSpan = formatDate(new Date(meeting.startsAt).getTime(), {year: undefined}) + ", " + formatTime(new Date(meeting.startsAt).getTime()) + " - " + formatTime(new Date(meeting.endsAt).getTime());
    const participantAvatars = meeting.participants.map((participant: Ent<"users">) => participant.imageUrl);
    const isOngoing = new Date(meeting.startsAt).getTime() - Date.now() < 0 && new Date(meeting.endsAt).getTime() - Date.now() > 0;
    const isUpcoming = new Date(meeting.startsAt).getTime() - Date.now() > 0;
    const isPast = new Date(meeting.endsAt).getTime() - Date.now() < 0;
    const getBadgeVariant = () => {
        if (isOngoing) {
            return "successful";
        }
        if (isPast) {
            return "destructive";
        }

        return "pending";
    }
    return (
        <Card className="p-6 flex flex-col gap-2 rounded-xl">
            <Badge className="w-fit rounded-full" variant={getBadgeVariant()}>{isOngoing ? "Ongoing" : formatCountdown(meeting.startsAt)} </Badge>
            <h3 className="font-medium text-md">{meeting.title}</h3>
            <span className="font-medium text-sm">{timeSpan}</span>
            <Separator  />
            <div className="flex flex-col w-full">

            <span className="font-medium text-sm">Participants</span>
            <div className="flex justify-between w-full items-center">
            <AvatarCircles  numPeople={0} avatarUrls={participantAvatars}  />
            <Link className={cn(buttonVariants({variant: "ringHover"}))} href={"/meetings/" + meeting._id}>
             View
            </Link>
            </div>

            </div>
           


        </Card>
    )

}
