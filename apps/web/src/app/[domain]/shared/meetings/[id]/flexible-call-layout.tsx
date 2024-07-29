"use client";
import { Icons } from "@knowingly/icons";
import {
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useStreamCall from "~/lib/hooks/useStreamCall";

type CallLayout = "speaker-vert" | "speaker-horiz" | "grid";

export default function FlexibleCallLayout() {
  const [layout, setLayout] = useState<CallLayout>("speaker-vert");

  const call = useStreamCall();

  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push('/meetings')} />
    </div>
  );
}

interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

function CallLayoutButtons({ layout, setLayout }: CallLayoutButtonsProps) {
  return (
    <div className="mx-auto w-full space-x-6">
      <button onClick={() => setLayout("speaker-vert")}>
        <Icons.layoutDistributeVertical
          className={layout !== "speaker-vert" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("speaker-horiz")}>
        <Icons.layoutDistributeHorizontal
          className={layout !== "speaker-horiz" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("grid")}>
        <Icons.layoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
}

interface CallLayoutViewProps {
  layout: CallLayout;
}

function CallLayoutView({ layout }: CallLayoutViewProps) {
  if (layout === "speaker-vert") {
    return <SpeakerLayout />;
  }

  if (layout === "speaker-horiz") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }

  if (layout === "grid") {
    return <PaginatedGridLayout />;
  }

  return null;
}
