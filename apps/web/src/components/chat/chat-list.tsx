import React, { useRef } from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import { cn } from "@knowingly/ui";
import type { FunctionReturnType } from "convex/server";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useQuery } from "convex/react";

interface ChatListProps {
  messages?: FunctionReturnType<typeof api.messages.list>;
  user: FunctionReturnType<typeof api.users.get>;
  sendMessage: (message: string) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  user,
  sendMessage,
  isMobile
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const me = useQuery(api.users.getMe);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.senderId !== user?._id ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.senderId === user?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className={cn("p-3 rounded-md max-w-xs", message.senderId === me?._id ? "bg-primary text-primary-foreground" : "bg-accent" )}>
                  {message.body}
                </span>
                {message.senderId === me?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={me?.imageUrl}
                      alt={me?.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile}/>
    </div>
  );
}
