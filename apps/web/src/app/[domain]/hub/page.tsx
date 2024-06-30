"use client";

import { api } from "@knowingly/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Banner } from "~/components/banner";
import { HubToolbar } from "./toolbar";
import { usePreview } from "~/lib/hooks/usePreview";
import { Switch } from "@knowingly/ui/switch";
import { Label } from "@knowingly/ui/label";
import { useSubdomain } from "~/lib/hooks/useSubdomain";

export default function HubPage() {
  const subdomain = useSubdomain();

  const hub = useQuery(api.hubs.getHub, {subdomain});
  const updateHub = useMutation(api.hubs.update);
  const { preview, togglePreview } = usePreview();

  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    []
  );

  if (!hub) {
    return null;
  }

  const onChange = async (content: any) => {
    await updateHub({
      subdomain: hub.subdomain,
      field: "customContent",
      value: JSON.stringify(content),
    });
  };


  return (
    <div className="flex flex-col w-full items-center relative">
      <div className="absolute top-[21rem] right-2 z-20 flex items-center gap-2">
        <Label className="font-medium">Toggle preview</Label>
          <Switch
            
            checked={preview}
            onCheckedChange={togglePreview}
          />
      </div>
      <Banner url={hub.banner} />

      <HubToolbar initialData={hub} preview={preview} />
      <div className="p-4 w-full pb-[400px]">
        <Editor
          onChange={onChange}
          initialContent={hub.customContent}
          editable={!preview}
        />
      </div>
    </div>
  );
}
