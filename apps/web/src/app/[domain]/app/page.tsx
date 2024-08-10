"use client";
import { api } from "@knowingly/backend/convex/_generated/api";
import { MinimalCard, MinimalCardImage, MinimalCardTitle } from "@knowingly/ui/minimal-card";
import { truncate } from "@knowingly/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { env } from "~/env";

export default function Overview() {
  const lastVisitedPages = useQuery(api.users.getLastVisitedPages);


  return (
    <div className="flex w-full flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className='w-full flex flex-col gap-2'>
          <h2 className="font-cal text-2xl font-bold text-foreground">
            Last Visited
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {lastVisitedPages?.map((page) => (
              <Link
                  key={page._id}
                  href={env.NEXT_PUBLIC_PROTOCOL + "://" + page.subdomain + "." + env.NEXT_PUBLIC_ROOT_DOMAIN + "/" + page._id}
                  className="z-50 hover:cursor-pointer"
                >
                  <MinimalCard className="overflow-hidden"> 
                    <div className="relative">
                    <MinimalCardImage src={page.banner.value} alt={page.name} />
                     
                    </div>
                    <MinimalCardTitle className="flex w-full gap-2 items-center  p-1">
                    <RenderIcon icon={page.icon} size={1.5} />
                      {truncate(page.name, 14)}

                    </MinimalCardTitle>
                       
                  </MinimalCard>
                </Link>
            ))}
            </div>

        </div>

      </div>
    </div>
  );
}
