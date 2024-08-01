"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@knowingly/ui/command";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { isUrl } from "@knowingly/utils";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";

export function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const subdomain = useSubdomain();
  const profiles = useQuery(api.pages.getPagesByHub, { subdomain });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        className={cn(
          "flex items-center gap-3 rounded-md bg-transparent px-4  py-2 text-sm font-normal text-foreground transition-all duration-150 ease-in-out hover:bg-card",
        )}
        onClick={() => setOpen(true)}
      >
        <Icons.search className="h-4 w-4" />
        Search
        <CommandShortcut>⌘K</CommandShortcut>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-none focus:ring-0"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Profiles">
            {profiles?.map((profile) => (
              <CommandItem
                className=" flex items-center gap-1 hover:cursor-pointer "
                key={profile._id}
                value={profile.name}
                onSelect={() => {
                  runCommand(() => router.push(`/${profile.slug}`));
                }}
              >
                <Avatar className="mr-2 h-8 w-8 rounded-sm">
                  {isUrl(profile?.icon) ? (
                    <AvatarImage
                      src={profile.icon}
                      alt={profile.name}
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full border bg-transparent">
                      <p className="text-xl">{profile?.icon}</p>
                    </div>
                  )}
                </Avatar>
                {profile.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
