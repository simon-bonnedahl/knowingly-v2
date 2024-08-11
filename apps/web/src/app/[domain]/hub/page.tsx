"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Label } from "@knowingly/ui/label";
import { Separator } from "@knowingly/ui/separator";
import { Switch } from "@knowingly/ui/switch";
import { adjustLightness, generateShades, hexToHSL } from "@knowingly/utils";

import { Banner } from "~/components/banner";
import { FieldList } from "~/components/field/field-list";
import { InviteModal } from "~/components/modals/invite-modal";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSingleQuery } from "~/lib/hooks/useSingleQuery";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { HubToolbar } from "./toolbar";
import { toast } from "sonner";
import { RequestInviteModal } from "~/components/modals/request-invite-modal";
import { useOnborda } from "~/components/onborda";
import { steps as memberOnboarding } from "~/components/onborda/steps-member";

export default function HubPage() {
  const subdomain = useSubdomain();
  const searchParams = useSearchParams();

  const hub = useSingleQuery(api.hubs.getHub, { subdomain });
  const updateHub = useMutation(api.hubs.update);
  const myRole = useQuery(api.hubs.getMyRole, { subdomain });
  const { edit, toggleEdit } = useEdit();
  const { theme } = useTheme();

  const {startOnborda} = useOnborda();



  const Editor = useMemo(
    () => dynamic(() => import("~/components/editor/editor"), { ssr: false }),
    [],
  );

  useEffect(() => {
    if (hub && theme) setPrimaryColor(hub.brandingColor, theme);
    if (hub && theme  && searchParams.get("onboarding") === "member") {
      startOnborda(memberOnboarding(hub.name));
    }
  }, [hub]);

  const setPrimaryColor = (
    color: string | undefined,
    theme: string | undefined,
  ) => {
    if (!color || !document) return;
    const colorHSL = hexToHSL(color);
    const { adjustedColor, lightness } =
      theme === "dark"
        ? adjustLightness(colorHSL, 10)
        : adjustLightness(colorHSL, 0);
    // Set the primary color
    document.documentElement.style.setProperty("--primary", adjustedColor);
    // Determine lightness from adjustedColor and set primaryForeground
    const primaryForeground = lightness < 50 ? "0 0 100%" : "0 0 0%";
    document.documentElement.style.setProperty(
      "--primary-foreground",
      primaryForeground,
    );
    // Generate shades and set them
    const shades = generateShades(colorHSL, 5);
    if (theme === "dark") shades.reverse();
    shades.forEach((shade, index) => {
      document.documentElement.style.setProperty(`--chart-${index + 1}`, shade);
    });
  };

  if (!hub) {
    return null;
  }

  const onChange = async (content: any) => {
    toast.promise(
     updateHub({
      subdomain: hub.subdomain,
      field: "content",
      value: JSON.stringify(content),
    }),
    {
      error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
    },
  );
  };

  return (
    <>
      <InviteModal inviteToken={searchParams.get("invite")} />
      <div className="relative flex w-full flex-col items-center">
        {myRole?.permissions.canEditHub && (
          <div className="absolute right-2 top-[20.5rem] z-20 flex items-center gap-2">
            <Label className="font-medium">Edit</Label>
            <Switch checked={edit} onCheckedChange={toggleEdit} />
          </div>
        )}

        <Banner banner={hub.banner} />

        <div className="w-full  px-24">
          <HubToolbar hub={hub}>
          {!myRole && (
              <RequestInviteModal hub={hub} />
          )}
          </HubToolbar>
          <FieldList fields={hub.fields} />
        </div>

        <Separator className="w-full" />
        <div className="w-full p-4 pb-96" >
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
