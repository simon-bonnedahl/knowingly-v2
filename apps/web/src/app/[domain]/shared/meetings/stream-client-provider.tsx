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
import { useAction } from "convex/react";

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
    const {user, isSignedIn} = useUser();
    const tokenProvider = useAction(api.meetings.generateMeetingToken)
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (!isSignedIn) return;

    let streamUser: User;

    if (user) {
      streamUser = {
        id: user.id,
        name: user.fullName || user.firstName || user.id,
        image: user.imageUrl,
      };
    } else {
      const id = uuid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const apiKey = env.NEXT_PUBLIC_STREAM_API_KEY;

    if (!apiKey) {
      throw new Error("Stream API key not set");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user, isSignedIn]);

  return videoClient;
}
