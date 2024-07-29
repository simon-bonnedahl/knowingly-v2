"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@knowingly/ui/button";
import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";

export const InstantMeeting = () => {
  const router = useRouter();

  const createInstantMeeting = useMutation(api.meetings.createInstant);

  const onCreate = async() => {
    createInstantMeeting()
      .then((res) => {
        toast.success("Meeting created");
        router.push(`/meetings/${res._id}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    };

  return <Button size={"sm"} variant={"ringHover"} onClick={onCreate} className="h-full">
    <Icons.plus className="mr-2 size-4" />
    Instant Meeting</Button>;
};
