"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

import { Button } from "@knowingly/ui/button";
import { useToast } from "@knowingly/ui/use-toast";

export const InstantMeeting = () => {
  const router = useRouter();

  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client) return;
    try {
      const call = client.call("default", uuid());
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      const description = "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      console.log(call);
      setCallDetail(call);
      router.push(`/meetings/${call.id}`);
      toast.success("Meeting created");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };

  if (!client) return null;

  return <Button onClick={createMeeting}>Instant Meeting</Button>;
};
