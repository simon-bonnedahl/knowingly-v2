"use client";

import Link from "next/link";
import { cn } from "@knowingly/ui";
import { buttonVariants } from "@knowingly/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@knowingly/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import type { FunctionReturnType } from "convex/server";
import type { api } from "@knowingly/backend/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { Icons } from "@knowingly/icons";

interface SidebarProps {
  isCollapsed: boolean;
  conversations: FunctionReturnType<typeof api.messages.getConversations>;

  onClick?: () => void;
}

export function Sidebar({  isCollapsed, conversations  }: SidebarProps) {
  
  const searchParams = useSearchParams ();
  const userId = searchParams.get("userId");


  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-xl">
            <p className="font-medium">Conversations</p>
            <span className="text-zinc-300">({conversations?.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-8 w-8"
              )}
            >
              <Icons.edit className="size-6" />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {conversations && conversations.length > 0 && conversations?.map((conversation, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={`?userId=${conversation.opponent?._id}`}
                    className={cn(
                      buttonVariants({ variant: userId === conversation.opponent?._id ? "ghost" : "ringHover",  size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      userId === conversation.opponent?._id && "border-2 border-primary"
                      ,
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={conversation.opponent?.imageUrl}
                        alt={conversation.opponent?.name}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                      <AvatarFallback className="bg-zinc-200 text-zinc-300">
                        {conversation.opponent?.name[0]}
                        </AvatarFallback>
                     
                    </Avatar>{" "}
                    <span className="sr-only">{conversation.opponent?.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {conversation.opponent?.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={`?userId=${conversation.opponent?._id}`}
              className={cn(
                "justify-start gap-4 flex "
              )}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={conversation.opponent?.imageUrl}
                  alt={conversation.opponent?.name}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col ">
                <span>{conversation.opponent?.name}</span>
                  <span className="text-zinc-300 text-xs truncate ">
                  {conversation.lastMessage?.body}
                  </span>
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}