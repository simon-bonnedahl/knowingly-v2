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
import { Input } from "@knowingly/ui/input";
import { Icons } from "@knowingly/icons";
import { toast } from "sonner";
import { Skeleton } from "@knowingly/ui/skeleton";

export default function AdminSettingsPage() {
  const subdomain = useSubdomain();

  const hub = useQuery(api.hubs.getHub, { subdomain: subdomain });
  const update = useMutation(api.hubs.update);
  const deleteHub = useMutation(api.hubs.deleteHub);
  const router = useRouter();


  const [color, setColor] = React.useState<string | undefined>();
  const debounceColor = useDebounce(color, 300);

  const [isPublic, setIsPublic] = React.useState<boolean | undefined>();
  const [subdomainField, setSubdomainField] = React.useState<string>(subdomain);
  const debouncedSubdomain = useDebounce(subdomainField, 500);

  const subdomainAvailable = useQuery(api.hubs.isAvailable, {
    subdomain: debouncedSubdomain,
  });




  const onDelete = async() => {
    await  deleteHub({
      subdomain: subdomain,
    });
    router.push(`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  };

  React.useEffect(() => {
    if (!hub) return;
      setColor(hub.brandingColor);
      setIsPublic(hub.isPublic);
      setSubdomainField(hub.subdomain);
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

  const onUpdateSubdomain = async () => {
    if (subdomainField === subdomain) return;
    toast.promise( update({
      subdomain: subdomain,
      field: "subdomain",
      value: subdomainField,
    }), {
      loading: "Updating subdomain",
      success: "Success: Updated subdomain",
      error: (error) => `Error: ${error.data}`,
    });
  };

  return (
    <div className="flex  flex-col space-y-12  py-2 pb-40">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
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
            {color ? <ColorPicker value={color} onChange={setColor} className="border border-muted-foreground size-10 rounded-md " /> : <Skeleton className="size-10 rounded-md" />}
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
        <div className="rounded-lg border bg-background">
          <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
            <h2 className="font-cal text-xl text-foreground">Subdomain </h2>
            <p className="text-sm text-muted-foreground">
              Set the subdomain for your hub to be used in the URL
            </p>
            <div className="relative">
                  <Input
                    placeholder=""
                    maxLength={20}
                    className="resize-none"
                    value={subdomainField}
                    onChange={(e) => setSubdomainField(e.target.value)}
                  />

                  <div className="absolute right-2.5 top-2.5">
                    {subdomainAvailable === undefined ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ">
                        <Icons.loader className="size-4 animate-spin " />
                        Checking
                      </div>
                    ) : subdomainAvailable ? (
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <Icons.check className="size-4 " /> Available
                      </div>
                    ) : (
                      <>
                      {subdomainField === subdomain ? (<div className="flex items-center gap-1 text-xs text-green-500">
                        <Icons.check className="size-4 " /> Current subdomain
                      </div>) : (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                        <Icons.x className="size-4 " /> Unavailable
                      </div>
                      )}
                      </>
                    )}
                  </div>
                </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 text-muted-foreground sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <p className="text-sm ">
              Will end on <b>.{env.NEXT_PUBLIC_ROOT_DOMAIN}</b>
            </p>
            <Button
                variant={"default"}
                size={"sm"}
                type="submit"
                onClick={onUpdateSubdomain}
                disabled={subdomainAvailable === false || subdomainField === subdomain}
              >
                Save
              </Button>
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
              <Button
                variant={"destructive"}
                size={"sm"}
                type="submit"
                onClick={onDelete}
              >
                Delete
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
