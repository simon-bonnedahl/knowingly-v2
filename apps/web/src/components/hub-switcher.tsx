"use client"

import {  useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover"
import { Button } from "@knowingly/ui/button"
import {  cn } from "@knowingly/ui"
import { useRouter } from "next/navigation"
import { env } from "~/env"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@knowingly/ui/command"
import type { FunctionReturnType } from "convex/server"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { Icons } from "@knowingly/icons"
import { useQuery } from "convex/react"
import { CreateHubModal } from "./modals/create-hub-modal"
import { RenderIcon } from "./icon-picker/render-icon"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>


interface HubSwitcherProps extends PopoverTriggerProps {
  currentHub: FunctionReturnType<typeof api.users.getHubs>[number]
  hubs: FunctionReturnType<typeof api.users.getHubs>

}

export default function HubSwitcher({ className, currentHub, hubs }: HubSwitcherProps) {

  const user = useQuery (api.users.getMe)
  const router = useRouter()
  const createHubFlag = useQuery(api.flags.get, { key: "feature_create_hub" })

  const [open, setOpen] = useState(false)
  const subdomain = useSubdomain()

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Hub"
            className={cn("justify-between flex gap-2 px-2 group", className)}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-md border bg-background group-hover:bg-card p-1.5">
              <RenderIcon icon={currentHub?.icon ?? {type:"ICON", value:"logo"}}  />
            </div>
            <div className="flex flex-col w-full  items-start gap-0 ">
              <span className="text-xs  text-muted-foreground">{currentHub ? "Hub" : "Knowingly"}</span>
              <span className="text-sm font-medium truncate">{currentHub?.name || "App" }</span>
            </div>
            <Icons.selector className="ml-auto size-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-none">
          <Command>
            <CommandList className="py-2 !border-none"> 
              <CommandInput placeholder="Search Hub..." className="border-none focus:ring-0 " />
                <CommandGroup key="hubs" heading="Hubs">
                  {hubs?.map((hub) => (
                    <CommandItem
                      key={hub.subdomain}
                      onSelect={() => {
                        router.push(`${env.NEXT_PUBLIC_PROTOCOL}://${hub.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
                        setOpen(false)
                      }}
                      className="text-sm hover:cursor-pointer hover:text-card-foreground text-foreground"
                    >
                      <RenderIcon icon={hub.icon} className="mr-2"  />
                      {hub.name}
                      <Icons.check
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentHub?.subdomain === hub.subdomain
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup key="knowingly" heading="Knowingly" >
                  <CommandItem
                    onSelect={() => {
                      router.push(`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
                      setOpen(false)
                    }}
                    className="text-sm hover:cursor-pointer hover:text-card-foreground text-foreground"
                  >
                     <RenderIcon icon={{type: "ICON", value: "logo"}} className="mr-2"  />
                    App
                    <Icons.check
                      className={cn(
                        "ml-auto h-4 w-4",
                        subdomain === "app"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                  {user?.role === "SUPERUSER" && (
                     <CommandItem
                     onSelect={() => {
                       router.push(`${env.NEXT_PUBLIC_PROTOCOL}://admin.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
                       setOpen(false)
                     }}
                     className="text-sm hover:cursor-pointer hover:text-card-foreground text-foreground"
                   >
                     <RenderIcon icon={{type: "ICON", value: "logo"}} className="mr-2"  />
                     Admin
                     <Icons.check
                       className={cn(
                         "ml-auto h-4 w-4",
                         subdomain === "admin"
                           ? "opacity-100"
                           : "opacity-0"
                       )}
                     />
                   </CommandItem>
                  )}
                </CommandGroup>
            </CommandList>
            {!!createHubFlag  && (
              <>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                    <CommandItem
                      className="text-sm hover:cursor-pointer"
                    >
                      <>
                      <CreateHubModal/>
                      </>
                    </CommandItem>
                </CommandGroup>
              </CommandList>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
  )
}
