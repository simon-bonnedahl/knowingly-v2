import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";

interface ChatProps {
  isMobile: boolean;
  userId: Id<"users">;
}

export function Chat({ isMobile, userId }: ChatProps) {
  const user = useQuery(api.users.get, { userId });
  const send = useMutation(api.messages.send);
  const messages = useQuery(api.messages.list, {userId});
  const markAsRead = useMutation(api.messages.markAllAsRead);

  const sendMessage = (message: string) => {
    if (!message) return;
    void send({ body: message, receiverId: userId });
  }




  React.useEffect(() => {
    void markAsRead({userId});
  }, [userId]);


  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar user={user} />

      <ChatList
        messages={messages}
        user={user}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
