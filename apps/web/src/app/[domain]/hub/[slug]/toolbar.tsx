"use client"

import React, {  useEffect, useRef, useState } from "react"
import { useMutation } from "convex/react"


import { Doc } from "@knowingly/backend/convex/_generated/dataModel"
import { useBanner } from "~/lib/hooks/useBanner"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useParams } from "next/navigation"
import { Button, buttonVariants } from "@knowingly/ui/button"
import { IconPicker } from "~/components/icon-picker"
import { Icons } from "~/components/icons"

import { SendMessage } from "./send-message"
import { RequestMeeting } from "./request-meeting"
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar"

interface ToolbarProps {
  initialData: Doc<"pages"> 
  preview?: boolean
  children?: React.ReactNode
}

export const PageToolbar = ({ initialData, preview, children}: ToolbarProps) => {
  const [name, setName] = useState(initialData.name)
  const params = useParams()
  const subdomain = decodeURIComponent(params.domain as string).split(".")[0]

  const updatePage = useMutation(api.pages.update)

  const banner = useBanner()

 
  


  const onIconSelect = (icon: string) => {
    updatePage({
      slug: initialData.slug,
      field: "icon",
      value: icon,
    })
  }

  const onRemoveIcon = () => {
    updatePage({
        slug: initialData.slug,
        field: "icon",
        value: "",
      })
  }

  useEffect(() => {
    updatePage({
        slug: initialData.slug,
        field: "name",
        value: name,
      })
  }, [name])



  return (
    <div className=" py-4 group relative w-full px-24">
      {!!initialData.icon && !preview && (
        <div className="absolute -top-8 left-24  items-center gap-x-2 group/icon hover:bg-white/10 rounded-xl ">
          <IconPicker onChange={onIconSelect}>
          <Avatar className="transition hover:opacity-75 w-full h-full rounded-sm">
              <AvatarImage src={initialData.icon} className="size-[4.5rem] object-cover rounded-full" />
              <AvatarFallback className="bg-transparent">
                <p className="text-7xl ">
                  {initialData.icon}
                </p>
              </AvatarFallback>
            </Avatar>
          </IconPicker>
          
        </div>
      )}
      {!!initialData.icon && preview && (
        <div className="text-7xl pt-6 absolute -top-14 left-24">
        <Avatar className="transition hover:opacity-75 w-full h-full rounded-sm">
            <AvatarImage src={initialData.icon} className="size-[4.5rem] object-cover rounded-full" />
            <AvatarFallback className="bg-transparent">
              <p className="text-7xl ">
                {initialData.icon}
              </p>
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
             <Button
            onClick={banner.onOpen}
            className="text-muted-foreground text-xs flex items-center gap-x-1 absolute top-0 left-0"
            variant="outline"
          >
            <Icons.moodSmile className="h-4 w-4 mr-2" />
            Add Icon
          </Button>
          </IconPicker>
        )}
        {!initialData.image && !preview && (
          <Button
            onClick={banner.onOpen}
            className="text-muted-foreground text-xs flex items-center gap-x-1 absolute top-0 left-32"
            variant="outline"
          >
            <Icons.photoPlus className="h-4 w-4 mr-2" />
            Add banner
          </Button>
        )}
      </div>
        <div className="flex w-full items-end justify-between ">

        <input type="text" disabled={preview} value={name}  onChange={(e ) => setName(e.currentTarget.value)} className="text-4xl mt-4 dark:text-white text-black  font-bold w-full bg-transparent focus:outline-none" />
        <div className="flex gap-2 items-center">
        {children}
        </div>
        
        </div>

    </div>
  )
}
