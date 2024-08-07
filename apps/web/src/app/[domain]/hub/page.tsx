"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Label } from "@knowingly/ui/label";
import { Separator } from "@knowingly/ui/separator";
import { Switch } from "@knowingly/ui/switch";

import { Banner } from "~/components/banner";
import { FieldList } from "~/components/field/field-list";
import { InviteModal } from "~/components/modals/invite-modal";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { HubToolbar } from "./toolbar";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSingleQuery } from "~/lib/hooks/useSingleQuery";

export default function HubPage() {
  const subdomain = useSubdomain();
  const searchParams = useSearchParams();

  const hub = useSingleQuery(api.hubs.getHub, { subdomain });
  const updateHub = useMutation(api.hubs.update);
  const { edit, toggleEdit } = useEdit();

  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    [],
  );

  if (!hub) {
    return null;
  }

  const onChange = async (content: any) => {
    await updateHub({
      subdomain: hub.subdomain,
      field: "content",
      value: JSON.stringify(content),
    });
  };

  return (
    <>
      <InviteModal inviteToken={searchParams.get("invite")} />
      <div className="relative flex w-full flex-col items-center">
        <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
          <Label className="font-medium">Edit</Label>
          <Switch checked={edit} onCheckedChange={toggleEdit} />
        </div>
        <Banner banner={hub.banner} />
        <div className="w-full  px-24">
          <HubToolbar hub={hub}  />
          <FieldList fields={hub.fields} />
        </div>

        <Separator className="w-full" />
        <div className="w-full p-4 pb-96">
          <Editor
            onChange={onChange}
            initialContent={hub.content}
            editable={edit}
          />
        </div>
      </div>
    </>
  );
}
