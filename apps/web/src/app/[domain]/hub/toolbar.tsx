"use client"

import React, {  useEffect, useRef, useState } from "react"
import { useMutation } from "convex/react"


import { IconPicker } from "../../../components/icon-picker"
import { Doc } from "@knowingly/backend/convex/_generated/dataModel"
import { useBanner } from "~/lib/hooks/useBanner"
import { api } from "@knowingly/backend/convex/_generated/api"
import { useParams } from "next/navigation"
import { Button } from "@knowingly/ui/button"
import { IconImageInPicture, IconMoodSmile, IconX } from "@tabler/icons-react"
import { useSubdomain } from "~/lib/hooks/useSubdomain"

interface ToolbarProps {
  initialData: Doc<"hubs"> 
  preview?: boolean
}

export const HubToolbar = ({ initialData, preview }: ToolbarProps) => {
  const [name, setName] = useState(initialData.name)
  const [description, setDescription] = useState(initialData.description)
  const subdomain = useSubdomain()

  const updateHub = useMutation(api.hubs.update)

  const banner = useBanner()

 
  


  const onIconSelect = (icon: string) => {
    updateHub({
      subdomain,
      field: "logo",
      value: icon,
    })
  }

  const onRemoveIcon = () => {
    updateHub({
      subdomain,
      field: "logo",
      value: "",
    })
  }

  useEffect(() => {
    updateHub({
      subdomain,
      field: "name",
      value: name,
    })
  }, [name])

  useEffect(() => {
    updateHub({
      subdomain,
      field: "description",
      value: description,
    })
  }, [description])

  return (
    <div className=" w-3/4 group relative">
        <div className="absolute -top-8 left-4  items-center gap-x-2 group/icon hover:bg-white/10 rounded-xl ">

      {!!initialData.logo && !preview && (
          <IconPicker onChange={onIconSelect}>
            <p className="text-7xl hover:opacity-75 transition">
              {initialData.logo}
            </p>
          </IconPicker>
          
      )}
     
        </div>
        {!!initialData.logo && preview && (
        <p className="text-7xl pt-6 absolute -top-14 left-4">{initialData.logo}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.logo && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <IconMoodSmile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.banner && !preview && (
          <Button
            onClick={banner.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <IconImageInPicture className="h-4 w-4 mr-2" />
            Add cover 
          </Button>
        )}
      </div>
        
        <input type="text" disabled={preview} value={name}  onChange={(e ) => setName(e.currentTarget.value)} className="text-4xl mt-4 dark:text-white text-black  font-bold w-full bg-transparent border-none focus:ring-0" />
        <input type="text" disabled={preview} value={description}  onChange={(e ) => setDescription(e.currentTarget.value)} className="text-md  dark:text-white text-black  font-bold w-full bg-transparent border-none focus:ring-0" />
    </div>
  )
}
