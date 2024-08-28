"use client";

import { useEffect, useState } from "react";

import { Icon } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button } from "@knowingly/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@knowingly/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";

import { RenderIcon } from "~/components/icon-picker/render-icon";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";

type Host = {
  name: string;
  icon: Icon;
  hostname: string | null;
};

export const HostFilter = ({initialHost} : {initialHost: string}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams()
  const hubs = useQuery(api.hubs.list, {});


  const [hosts, setHosts] = useState<Host[]>([{ name: "All", icon: { type: "ICON", value: "logo" }, hostname: null },
    {
      name: "Landing",
      icon: { type: "ICON", value: "logo" },
      hostname: "simbo.casa",
    },
    {
      name: "App",
      icon: { type: "ICON", value: "logo" },
      hostname: "app.simbo.casa",
    },])
    
  const [selectedHost, setSelectedHost] = useState(hosts.find((host) => host.hostname === initialHost) || hosts[0]!);

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedHost.hostname) {
      newSearchParams.set("host", selectedHost.hostname);
    } else {
      newSearchParams.delete("host");
    }
    router.push(`/analytics?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedHost]);

  useEffect(() => {
    if(hubs)
        setHosts([...hosts, ...hubs.map((hub) => ({
            name: hub.name,
            icon: hub.icon,
            hostname: hub.subdomain + ".simbo.casa",
        } as Host))])
  }, [hubs])


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Hub"
          className={cn("group flex justify-between gap-2 px-2 w-64")}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background p-1.5 group-hover:bg-card">
            <RenderIcon icon={selectedHost.icon} />
          </div>
          <span className="truncate text-sm font-medium">
            {selectedHost.name}
          </span>
          <Icons.selector className="ml-auto size-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 border-none p-0">
        <Command>
          <CommandList className="!border-none py-2">
            <CommandInput
              placeholder="Search host..."
              className="border-none focus:ring-0 "
            />
            <CommandGroup key="hosts" heading="Hosts">
              {hosts?.map((host) => (
                <CommandItem
                  key={host.name}
                  onSelect={() => {
                    setSelectedHost(host);
                    setOpen(false);
                  }}
                  className="text-sm text-foreground hover:cursor-pointer hover:text-card-foreground"
                >
                  <RenderIcon icon={host.icon} className="mr-2" />
                  {host.name}
                  <Icons.check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedHost?.hostname === host.hostname
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
