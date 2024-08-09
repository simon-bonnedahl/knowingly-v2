"use client";

import { api } from "@knowingly/backend/convex/_generated/api";

import "@blocknote/core/fonts/inter.css";

import { useQuery } from "convex/react";

import { Label } from "@knowingly/ui/label";
import { Switch } from "@knowingly/ui/switch";

import { Banner } from "~/components/banner";
import { CollectionToolbar } from "./toolbar";
import { Separator } from "@knowingly/ui/separator";
import { buttonVariants } from "@knowingly/ui/button";
import { Icon, Icons } from "@knowingly/icons";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { useEdit } from "~/lib/hooks/useEdit";
import Link from "next/link";
import { cn } from "@knowingly/ui";
import { Input } from "@knowingly/ui/input";
import { MinimalCard, MinimalCardImage } from "@knowingly/ui/minimal-card";
import Image from "next/image";

// export async function generateStaticParams() {
//   const allHubs = await db.hub.findMany({
//     select: {
//       subdomain: true,
//       customDomain: true,
//     },
//   });

//   const allPaths = allHubs
//     .flatMap(({ subdomain, customDomain }) => [
//       subdomain && {
//         domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//       },
//       customDomain && {
//         domain: customDomain,
//       },
//     ])
//     .filter(Boolean);

//   return allPaths;
// }

export default function CollectionPage({ params }: { params: { id: string } }) {
  const id = params.id as Id<"collections">;
  const collection = useQuery(api.collections.get, { id });

  const { edit, toggleEdit } = useEdit();

  

  if (!collection) {
    return null;
  }


  return (
    <div className="relative flex w-full flex-col items-center">
      <Link href="/" className={cn(buttonVariants({
        variant: "ringHover",
        className: "absolute top-2 left-2 z-30 h-10 w-10 rounded-full p-1",
      }))}>
        <Icons.arrowLeft className="size-5" />
      </Link>
      <div className="absolute right-2 top-[21rem] z-20 flex items-center gap-2">
        <Label className="font-medium">Edit</Label>
        <Switch checked={edit} onCheckedChange={toggleEdit} />
      </div>
      <Banner banner={collection.banner}/>
      <div className="w-full  px-24">
        <CollectionToolbar collection={collection} /> {/* TODO remove pages or extend type? */}

      

      </div>

      <Separator className="w-full" />
      

      <div className="w-full p-4 pb-96 gap-2 flex flex-col">
        <Input placeholder="Search..." className="w-full"/>
        <div className="w-full grid grid-cols-3 gap-2">
        {collection.pages?.map((page) => (
                <Link
                  key={page._id}
                  href={`/${page._id}`}
                  className="hover:cursor-pointer group relative"
                >
                  <MinimalCard>
                    <div className="relative">
                      <MinimalCardImage
                        src={page.banner.value}
                        alt={page.name}
                      />
                      <div className="absolute -bottom-6 left-4 size-[3.5rem] ">
                        {page.icon.type === "URL" && (
                          <Image
                            src={page.icon.value}
                            width={50}
                            height={50}
                            alt="icon"
                            className="size-full rounded-full object-cover"
                          />
                        )}
                        {page.icon.type === "EMOJI" && (
                          <span className=" select-none text-[3rem] leading-[3rem]">
                            {page.icon.value}
                          </span>
                        )}
                        {page.icon.type === "ICON" && (
                          <Icon name={page.icon.value} className="size-full" />
                        )}
                      </div>
                    </div>
                    <span className="px-5 text-xl font-medium">
                      {page.name}
                    </span>
                  </MinimalCard>
                </Link>
              ))}

        </div>
       
    
      </div>
    </div>
  );
}
