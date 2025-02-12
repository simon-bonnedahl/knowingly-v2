"use client";
 
import { useChat } from "ai/react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useVercelUseChatRuntime } from "@assistant-ui/react-ai-sdk";
import { env } from "~/env";
 
export function AIAssistantProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chat = useChat({
    api: `${env.NEXT_PUBLIC_CONVEX_API_ENDPOINT}/api/chat`,
  });
 
  const runtime = useVercelUseChatRuntime(chat);
 
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}