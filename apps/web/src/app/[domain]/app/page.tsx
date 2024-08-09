"use client";
import { api } from "@knowingly/backend/convex/_generated/api";
import { MinimalCard, MinimalCardImage } from "@knowingly/ui/minimal-card";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { env } from "~/env";

export default function Overview() {
  const lastVisitedPages = useQuery(api.users.getLastVisitedPages);


  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Overview
          </h1>
        </div>
        <div className='max-w-screen'>
          <h2 className="font-cal text-2xl font-bold text-foreground">
            Last Visited Pages
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {lastVisitedPages?.map((page) => (
              <Link
                  key={page._id}
                  href={env.NEXT_PUBLIC_PROTOCOL + "://" + page.subdomain + "." + env.NEXT_PUBLIC_ROOT_DOMAIN + "/" + page._id}
                  className="z-50 hover:cursor-pointer"
                >
                  <MinimalCard>
                    <div className="relative">
                    <MinimalCardImage src={page.banner.value} alt={page.name} />
                      <div className="absolute -bottom-6 left-4 size-[3.5rem] ">
                        <RenderIcon icon={page.icon} size={1.5} />
                      </div>
                    </div>
                        <span className="text-xl font-medium px-5">
                          {page.name}
                        </span>
                  </MinimalCard>
                </Link>
            ))}
            </div>

        </div>

      </div>
    </div>
  );
}
