"use client";
import Link from "next/link";
import type { Doc } from "@knowingly/backend/convex/_generated/dataModel"
import Image from "next/image";
import { truncate } from "@knowingly/utils";
import { env } from "~/env";
import { Icons } from "@knowingly/icons";
export default function HubCard({
  hub,
}: {
  hub: Doc<"hubs">;
}) {
  const url = `${hub.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="group relative gap-2">
      <Link href={`${env.NEXT_PUBLIC_PROTOCOL}://${url}`}>
        <div className="w-full transform-gpu  shadow-md duration-150 ease-in-out hover:scale-[1.01] hover:shadow-xl">
          <Image
            alt={hub.name ?? "Card thumbnail"}
            width={500}
            height={400}
            className="aspect-video w-full  rounded-md object-cover"
            src={hub.banner ?? "/placeholder-banner.svg"}
          />
        </div>
      </Link>

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide text-black dark:text-white">
              {hub.name}
            </h3>
            <a
              href={`${env.NEXT_PUBLIC_PROTOCOL}://${url}`}
              rel="noreferrer"
              className="flex items-center gap-1 truncate rounded-md px-2 py-1 text-sm font-medium  bg-background text-foreground "
            >
              {truncate(url, 20)} <Icons.arrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className=" line-clamp-1 text-sm font-normal leading-snug  text-black dark:text-white">
            {hub.description}
          </p>
        </div>
      </div>
    </div>
  );
}
