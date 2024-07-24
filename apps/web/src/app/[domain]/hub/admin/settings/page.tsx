"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "@knowingly/ui/button";
import { Switch } from "@knowingly/ui/switch";

import { ColorPicker } from "~/components/color-picker";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { useRouter } from "next/navigation";
import { env } from "~/env";

export default function AdminSettingsPage() {
  const subdomain = useSubdomain();

  const hub = useQuery(api.hubs.getHub, { subdomain: subdomain });
  const update = useMutation(api.hubs.update);
  const deleteHub = useMutation(api.hubs.deleteHub);
  const router = useRouter();

  const [color, setColor] = React.useState<string | undefined>();
  const [isPublic, setIsPublic] = React.useState<boolean | undefined>();
  const debounceColor = useDebounce(color, 300);

  const onDelete = async() => {
    await  deleteHub({
      subdomain: subdomain,
    });
    router.push(`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  };

  React.useEffect(() => {
    if (!hub) return;
    if (hub.brandingColor) {
      setColor(hub.brandingColor);
    }
    if (hub.isPublic) {
      setIsPublic(hub.isPublic);
    }
  }, [hub]);

  React.useEffect(() => {
    if (!debounceColor) return;
    void update({
      subdomain: subdomain,
      field: "brandingColor",
      value: debounceColor,
    });
  }, [debounceColor]);

  React.useEffect(() => {
    if (isPublic === undefined || isPublic === hub?.isPublic) return;
    void update({
      subdomain: subdomain,
      field: "isPublic",
      value: isPublic,
    });
  }, [isPublic]);

  return (
    <div className="flex  flex-col space-y-12  py-2">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Settings
          </h1>
        </div>
        <div className="rounded-lg border bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Branding color</h2>
            <p className="text-sm text-muted-foreground">
              Set the color that represents your brand to be used in various
              places
            </p>
            {color && <ColorPicker value={color} onChange={setColor} />}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 text-muted-foreground sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-sm ">
              We adjust the lightness to a lighter shade in dark mode
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Public hub</h2>
            <p className="text-sm text-muted-foreground">
              Make the hub public to allow anyone to view
            </p>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 text-muted-foreground sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-sm ">
              Will affect how it appears in search engines
            </p>
          </div>
        </div>
        <form className="rounded-lg border border-red-500 bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Delete hub</h2>
            <p className="text-sm text-muted-foreground">
              Deletes the hub and all data and users associated with it. Type in
              the name of the hub <b>{hub?.name}</b> to confirm.
            </p>

            <input
              name="confirm"
              type="text"
              required
              pattern={hub?.name}
              placeholder={hub?.name}
              className="w-full max-w-md rounded-md border  p-2 text-sm  focus:outline-none "
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-center text-sm text-muted-foreground">
              This action is irreversible. Please proceed with caution.
            </p>
            <div className="w-32">
              <Button
                variant={"destructive"}
                size={"sm"}
                type="submit"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
