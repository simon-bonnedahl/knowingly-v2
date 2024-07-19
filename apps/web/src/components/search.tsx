"use client"

import { cn } from "~/lib/utils"



import * as React from "react"
import { useRouter } from "next/navigation"

import { useTheme } from "next-themes"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@knowingly/ui/command"
import { DialogProps } from "@radix-ui/react-dialog"
import { useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { Icons } from "./icons"
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar"





export function Search() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const subdomain = useSubdomain()
  const profiles = useQuery(api.pages.getPagesByHub, { subdomain })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
       <button  className={cn("flex items-center rounded-md py-2 px-4 gap-3  transition-all duration-150 ease-in-out text-foreground hover:bg-card bg-transparent text-sm font-normal",
        )} onClick={() => setOpen(true)}>
        <Icons.search className="w-4 h-4"/>
            Search
        <CommandShortcut>⌘K</CommandShortcut>
        </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."  className="focus:ring-0 border-none"/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Profiles">
            {profiles?.map((profile) => (
                <CommandItem
                className=" flex items-center gap-1 hover:cursor-pointer "
                  key={profile._id}
                  value={profile.name}
                  onSelect={() => {
                    runCommand(() => router.push(`/${profile.slug}`))
                  }}
                >   
                <Avatar className="mr-2 h-8 w-8 rounded-sm">
                        <AvatarImage
                          src={profile.icon!}
                          alt={profile.name}
                          className="h-full w-full rounded-full"
                        />
                        <AvatarFallback className="bg-transparent border w-full h-full" ><p className="text-xl">{profile?.icon}</p></AvatarFallback>
                      </Avatar>
                      {profile.name}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
         
        </CommandList>
      </CommandDialog>
    </>
  )
}