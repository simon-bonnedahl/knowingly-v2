"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CallingState, StreamCall, useCallStateHooks,
  useConnectedUser,
  useStreamVideoClient,
  VideoPreview
} from "@stream-io/video-react-sdk";
import { useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import { Button } from "@knowingly/ui/button";

import useStreamCall from "~/lib/hooks/useStreamCall";
import {
  AudioInputDeviceSelector, VideoInputDeviceSelector
} from "./device-list";
import FlexibleCallLayout from "./flexible-call-layout";
import { ParticipantsPreview } from "./participants-preview";
import PermissionPrompt from "./permission-prompt";
import { Icons } from "@knowingly/icons";

const MeetingPage = () => {
  const { id } = useParams();

  const meeting = useQuery(api.meetings.get, {
    meetingId: id as Id<"meetings">,
  });
  const client = useStreamVideoClient();
  const [joined, setJoined] = useState(false);

  if (!client || !meeting) return;
  const call = client.call("default", id as string);
  if (!call) throw new Error("Failed to create meeting");

  void call.getOrCreate({
    data: {
      starts_at: new Date(meeting.startsAt).toISOString(),
      custom: {
        title: meeting.title,
        description: meeting.description,
      },
    },
  });

  return (
    <StreamCall call={call}>
      <div className="flex w-full flex-col justify-center space-y-6">
        <div className="flex w-full flex-col items-center  justify-center gap-2">
          <span className="font-bold">
            {meeting.title}
            {call.state.custom.description}
          </span>
          <span>
            {new Date(meeting.startsAt).toLocaleDateString()}{" "}
            {new Date(meeting.startsAt).toLocaleTimeString()}
          </span>
        </div>

        {joined ? <MeetingRoom /> : <Lobby setJoined={setJoined} />}
      </div>
    </StreamCall>
  );
};

function Lobby({ setJoined }: { setJoined: (value: boolean) => void }) {
  const call = useStreamCall();

  const {
    useMicrophoneState,
    useCameraState,
    useCallEndedAt,
    useCallStartsAt,
  } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [micCamDisabled, setMicCamDisabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (micCamDisabled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [micCamDisabled, call]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeDiff = callStartsAt - currentTime;
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setCountdown(
        `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`,
      );
    } else {
      setCountdown("");
    }
  }, [currentTime, callStartsAt]);

  const onJoin = () => {
    setJoined(true);
  };

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center  gap-3">
      <div className="flex gap-2">
        <div className="overflow-hidden rounded-xl object-cover ">
          <VideoPreview
            DisabledVideoPreview={DisabledVideoPreview}
            NoCameraPreview={NoCameraPreview}
            StartingCameraPreview={StartingCameraPreview}
          />
        </div>

        <ParticipantsPreview />
      </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <AudioInputDeviceSelector />
            <Button
              size={"icon"}
              className="rounded-full"
              variant={micState.isEnabled ? "ghost" : "destructive"}
              onClick={() => {
                call.microphone.toggle();
              }}
            >
               {micState.isEnabled ? <Icons.microphone className="size-4" /> : <Icons.microphoneOff className="size-4"  />}
            </Button>
          </div>
          <div className="flex gap-2">
            <VideoInputDeviceSelector />
            <Button
              size={"icon"}
              className="rounded-full"
              variant={camState.isEnabled ? "ghost" : "destructive"}
              onClick={() => {
                call.camera.toggle();
              }}
            >
              {camState.isEnabled ? <Icons.video className="size-4" /> : <Icons.videoOff className="size-4"  />}
            </Button>
          </div>
        </div>
        {/* <AudioOutputDeviceSelector /> */}
      <Button
        variant="ringHover"
        onClick={onJoin}
        disabled={currentTime < callStartsAt}
      >
        {currentTime < callStartsAt ? `Join in ${countdown}` : "Join meeting"}
      </Button>
    </div>
  );
}

function MeetingRoom() {
  const { useCallCallingState } = useCallStateHooks();
  const call = useStreamCall();

  const callingState = useCallCallingState();
  console.log("Calling state", callingState);

  if (callingState !== CallingState.JOINED) {
    call.join();
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading ...
      </div>
    );
  }

  return <FlexibleCallLayout />;
}

export const DisabledVideoPreview = () => {
  const connectedUser = useConnectedUser();
  if (!connectedUser) return null;

  return (
    <div className="flex h-80 w-full flex-col items-center justify-center rounded-xl border">
      <Avatar>
        <AvatarImage src={connectedUser.image} />
        <AvatarFallback>{connectedUser.name[0]}</AvatarFallback>
      </Avatar>
      <span>{connectedUser.name}</span>
    </div>
  );
};

const NoCameraPreview = () => (
  <div>
    <Icons.video className="h-16 w-16 text-muted-foreground" />
  </div>
);

const StartingCameraPreview = () => (
  <div>
    <Icons.loader className="h-16 w-16 text-muted-foreground" />
  </div>
);

export default MeetingPage;
