import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";

import { api } from "@knowingly/backend/convex/_generated/api";

import { Onborda, OnbordaProvider } from "~/components/onborda";
import OnbordaCard from "~/components/onborda/onborda-card";
import { steps } from "~/components/onborda/steps-hub";
import { env } from "~/env";
import Navbar from "../../components/navbar";
import { AIAssistantProvider } from "./AIAssistantProvider";
import { DynamicIslandDemo } from "./dynamic-island-demo";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const subdomain = domain.split(".")[0];

  if (subdomain === "app") {
    return {
      title: "App | Knowingly",
      description: "The app of Knowingly",
      openGraph: {
        title: "App | Knowingly",
        description: "The app of Knowingly",
        images: ["/banner.png"],
      },
      icons: ["/logo-small-black.svg"],
      metadataBase: new URL(`${env.NEXT_PUBLIC_PROTOCOL}://${domain}`),
    };
  }

  const hub = await fetchQuery(api.hubs.getHub, { subdomain });

  if (!hub) return null;

  const icon =
    hub.icon.type === "URL" ? hub.icon.value : "/logo-small-black.svg";

  return {
    title: hub.name + " | Knowingly",
    description: hub.description,
    openGraph: {
      title: hub.name + " | Knowingly",
      description: hub.description,
      images: [hub.banner || "/banner.png"],
    },
    icons: [icon],
    metadataBase: new URL(`${env.NEXT_PUBLIC_PROTOCOL}://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `${process.env.NEXT_PUBLIC_PROTOCOL}://${data.customDomain}`,
    //     },
    //   }),
  };
}

export default  function DomainLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const { userId } = auth();
  const domain = decodeURIComponent(params.domain);
  const subdomain = domain.split(".")[0];
  if (!subdomain) {
    return notFound();
  }

  return (
    <OnbordaProvider>
      <Onborda cardComponent={OnbordaCard} shadowOpacity="0.8">
        {userId ? (
          <>
            <Navbar subdomain={subdomain} />
            <DynamicIslandDemo />
            <div className="fixed right-0 top-4 flex min-h-screen justify-center overflow-hidden rounded-tl-3xl border bg-card shadow-2xl md:w-[70vw]  lg:w-[76vw] xl:w-[82vw] ">
              {children}
            </div>
          </>
        ) : (
          <div className=" flex min-h-screen w-full justify-center  overflow-hidden bg-card">
            {children}
          </div>
        )}
      </Onborda>
    </OnbordaProvider>
  );
  
}