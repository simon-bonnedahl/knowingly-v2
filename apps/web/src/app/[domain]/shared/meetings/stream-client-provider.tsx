"use client";

import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import {v4 as uuid} from "uuid";
import { useEffect, useState } from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}
import { useUser } from "@clerk/nextjs";
import { env } from "~/env";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";

export default function StreamClientProvider({ children }: ClientProviderProps) {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

function useInitializeVideoClient() {
  const getToken = useAction(api.calls.generateToken);
  const user  = useQuery( api.users.getMe);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (!user) return;
    const apiKey = env.NEXT_PUBLIC_STREAM_API_KEY;

    if (!apiKey) {
      console.error("Stream API key not set");
      return;
    }

    async function createClient() {
      try {
        const token = await getToken();
        if (!token) {
          console.error("Failed to get token");
          return;
        }

        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user!._id,
            name: user!.name,
            image: user!.imageUrl,
          } as User,
          token,
        });

        setVideoClient(client);
      } catch (error) {
        console.error("Error creating StreamVideoClient:", error);
      }
    }

    createClient();

    return () => {
      videoClient?.disconnectUser();
      setVideoClient(null);
    };
  }, [user]);

  return videoClient;
}
