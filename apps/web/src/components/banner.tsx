"use client"

import { useBanner } from "~/lib/hooks/useBanner"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useMutation } from "convex/react"
import { cn } from "@knowingly/ui"
import { api } from "@knowingly/backend/convex/_generated/api"
import { Button } from "@knowingly/ui/button"
import { Skeleton } from "@knowingly/ui/skeleton"


interface BannerProps {
  url?: string
  preview?: boolean
}

export const Banner = ({ url, preview }: BannerProps) => {
  const params = useParams()
  const subdomain = decodeURIComponent(params.domain as string).split(".")[0]
  const banner = useBanner()
  const update = useMutation(api.hubs.update)



  return (
    <div
      className={cn(
        "relative w-full h-[30vh] group rounded-tl-3xl overflow-clip",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover rounded-tl-3xl " />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => banner.onReplace(url)}
            className="text-muted-foreground text-xs cl"
            variant="outline"
          >
            Change cover
          </Button>
         
        </div>
      )}
    </div>
  )
}

Banner.Skeleton = function BannerSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />
}