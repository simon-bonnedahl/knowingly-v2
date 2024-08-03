"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAction, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
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
import { capitalizeFirstLetter, isUrl } from "@knowingly/utils";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import type { Ent } from "@knowingly/backend/convex/types";

export function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const subdomain = useSubdomain();
  const pages = useQuery(api.pages.getPagesByHub, { subdomain });
  const getPages = useAction(api.pages.vectorSearch);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Ent<"pages">[]>();

  React.useEffect(() => {
    setSearchResults(pages);
  }, [pages]);

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

  React.useEffect(() => {
    const fetchPages = async () => {
      if (searchResults?.length === 0 && search.length > 0) {
        const result = await getPages({ query: search, subdomain });
        if (result && result.length > 0) {
        setSearchResults(result);
        }
      }
    };
    void fetchPages();
  }, [searchResults]);

  React.useEffect(() => {
    if (search.length > 0) {
      const results = pages?.filter((page) =>
        page.name.toLowerCase().includes(search.toLowerCase()),
      );
      setSearchResults(results);
    } else {
      setSearchResults(pages);
    }
  }, [search]);

  const groupPagesByType = (pages: Ent<"pages">[] | undefined) => {
    if (!pages) return {};

    return pages.reduce((acc, page) => {
      const type = page.type || "Unknown"; // Default to "Unknown" if no type
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(page);
      return acc;
    }, {} as Record<string, Ent<"pages">[]>);
  };


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
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          className="border-none focus:ring-0"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groupPagesByType(searchResults)).map(
            ([type, pages]) => (
              <CommandGroup key={type} heading={capitalizeFirstLetter(type)}>
                {pages.map((page) => (
                  <CommandItem
                    className="flex items-center gap-1 hover:cursor-pointer"
                    key={page._id}
                    value={page.name}
                    onSelect={() => {
                      runCommand(() => router.push(`/${page.slug}`));
                    }}
                  >
                    <Avatar className="mr-2 h-8 w-8 rounded-sm">
                      {isUrl(page?.icon) ? (
                        <AvatarImage
                          src={page.icon}
                          alt={page.name}
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="h-full w-full border bg-transparent">
                          <p className="text-xl">{page?.icon}</p>
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {page.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ),
          )}
          {/* <CommandGroup heading="Profiles">
            {searchResults?.map((profile) => (
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
                    <AvatarFallback className="h-full w-full border bg-transparent">
                      <p className="text-xl">{profile?.icon}</p>
                    </AvatarFallback>
                  )}
                </Avatar>
                {profile.name}
              </CommandItem>
            ))}
          </CommandGroup> */}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
