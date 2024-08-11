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

export default async function Layout({
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

  // if(!userId ) {
  //   return(
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-background">
  //       <div className="flex flex-col items-center justify-center p-4 bg-card rounded-xl shadow-xl">
  //         <h1 className="text-3xl font-bold text-center">Access Denied</h1>
  //         <p className="text-center">You need to be logged in to access this page</p>
  //       </div>
  //     </div>
  //   )
  // }
  if (!userId) {
    return (
      <div className=" w-full flex min-h-screen justify-center  overflow-hidden bg-card">
        {children}
      </div>
    );
  }

  return (
    <>
      <OnbordaProvider>
        <Onborda  cardComponent={OnbordaCard} shadowOpacity="0.8">
            <Navbar subdomain={subdomain} />
            <DynamicIslandDemo />
            <div className="fixed right-0 top-4 flex min-h-screen justify-center overflow-hidden rounded-tl-3xl border bg-card shadow-2xl md:w-[70vw]  lg:w-[76vw] xl:w-[82vw] " >
              {children}
            </div>
        </Onborda>
      </OnbordaProvider>
    </>
  );
  const hub = await fetchQuery(api.hubs.getHub, { subdomain });
  if (!hub) return notFound();

  if (
    params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    hub?.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`${env.NEXT_PUBLIC_PROTOCOL}://${hub?.customDomain}`);
  }

  if (userId)
    return (
      <>
        <Navbar subdomain={subdomain} />
        <div className="fixed right-0 top-16 flex min-h-screen justify-center rounded-tl-3xl border border-background bg-card   shadow-xl md:w-[70vw] lg:w-[76vw] xl:w-[82vw] ">
          {children}
        </div>
      </>
      //    <div className="flex justify-between ">
      //    <Navbar subdomain={subdomain} session={session} />
      //    <div className="mt-4 w-full min-h-screen bg-card rounded-tl-3xl shadow-xl flex justify-center border border-background overflow-hidden">
      //      {children}
      //    </div>
      //  </div>
    );

  return (
    <div className="mt-16 min-h-screen bg-background ">
      <div className="fixed top-0 z-30 flex w-full justify-center border-b border-white/50 bg-background shadow-md transition-all">
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="font-display flex items-center text-2xl">
            <Image
              src="/logo-black.svg"
              alt="Knowingly logo"
              width={125}
              height={75}
              className="dark:hidden  md:scale-110"
            />

            <Image
              src="/logo-fullwhite.svg"
              alt="Knowingly logo"
              width={125}
              height={75}
              className="hidden dark:block xl:scale-125 "
            />
          </Link>
          {/* 
              <SignInButton >
                  Log in
              </SignInButton> */}
        </div>
      </div>
      {children}
    </div>
  );
}
