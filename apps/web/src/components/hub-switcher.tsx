"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@knowingly/ui/dialog"
import { Button } from "@knowingly/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar"
import {  cn } from "~/lib/utils"
import { Label } from "@knowingly/ui/label"
import { Input } from "@knowingly/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@knowingly/ui/select"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { env } from "~/env"
import { IconCheck, IconChevronDown, IconCirclePlus } from "@tabler/icons-react"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@knowingly/ui/command"
import { FunctionReturnType } from "convex/server"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { Icons } from "./icons"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>


interface HubSwitcherProps extends PopoverTriggerProps {
  currentHub: FunctionReturnType<typeof api.users.getMyHubs>[number] | undefined
  hubs: FunctionReturnType<typeof api.users.getMyHubs>

}

export default function HubSwitcher({ className, currentHub, hubs }: HubSwitcherProps) {

  const {theme} = useTheme()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [showNewHubDialog, setShowNewHubDialog] = useState(false)
  const subdomain = useSubdomain()





  return (
    <Dialog open={showNewHubDialog} onOpenChange={setShowNewHubDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Hub"
            className={cn("justify-between flex gap-2 px-2 group", className)}
          >
            <Avatar className=" h-8 w-8 rounded-md border bg-background group-hover:bg-card p-1 ">
              <AvatarImage
                src={currentHub?.logo ?? "/logo-small-black.svg"}
                className="h-full w-full rounded-full"
                alt={currentHub?.subdomain}
              />
              <AvatarFallback className="bg-transparent" ><p className="text-xl">{currentHub?.logo}</p></AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full  items-start gap-0 ">
              <span className="text-xs  text-muted-foreground">{currentHub ? "Hub" : "Knowingly"}</span>
              <span className="text-sm font-medium">{currentHub?.name || "App" }</span>
            </div>
            <Icons.selector className="ml-auto size-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-none">
          <Command>
            <CommandList className="py-2 !border-none"> 
              <CommandInput placeholder="Search Hub..." className="border-none focus:ring-0 " />
                <CommandGroup key="hubs" heading="Hubs">
                  {hubs && hubs.map((hub : any) => (
                    <CommandItem
                      key={hub.subdomain}
                      onSelect={() => {
                        router.push(`${env.NEXT_PUBLIC_PROTOCOL}://${hub.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
                        setOpen(false)
                      }}
                      className="text-sm hover:cursor-pointer hover:text-card-foreground text-foreground"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={hub.logo!}
                          alt={hub.name}
                          className="h-full w-full rounded-full"
                        />
                        <AvatarFallback className="bg-transparent" ><p className="text-xl">{hub?.logo}</p></AvatarFallback>
                      </Avatar>
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
                    <Avatar className="mr-2 h-5 w-5 rounded-md">
                      <AvatarImage
                        src="/logo-small-black.svg"
                        alt="Knowingly"
                        
                      />
                      <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    App
                    <IconCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        subdomain === "app"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      router.push(`${env.NEXT_PUBLIC_PROTOCOL}://admin.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
                      setOpen(false)
                    }}
                    className="text-sm hover:cursor-pointer hover:text-card-foreground text-foreground"
                  >
                    <Avatar className="mr-2 h-5 w-5 rounded-md">
                      <AvatarImage
                        src="/logo-small-black.svg"
                        alt="Knowingly"
                      />
                      <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    Admin
                    <IconCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        subdomain === "admin"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewHubDialog(true)
                    }}
                    className="text-sm hover:cursor-pointer"
                  >
                    <Icons.plus className="mr-2 h-5 w-5" />
                    Create Hub
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Hub</DialogTitle>
          <DialogDescription>
            Add a new hub to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hub name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewHubDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}