"use client";

import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

import {
  IconBell,
  IconCalendar,
  IconCompass,
  IconDots,
  IconHeartHandshake,
  IconHome,
  IconLogout,
  IconMessages,
  IconSparkles,
  IconUser,
  IconUserCheck,
} from "@tabler/icons-react";
import { cn, hexToHSL, truncate } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useClerk } from "@clerk/nextjs";
import HubSwitcher from "./hub-switcher";
import { useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Skeleton } from "@knowingly/ui/skeleton";
import { Search } from "./search";
import { Notifications } from "./notifications";
import { FunctionReturnType } from "convex/server";
import { env } from "~/env";

export default function Navbar({ subdomain }: { subdomain: string }) {
  const segments = useSelectedLayoutSegments();
  const { theme, setTheme } = useTheme();
  const router = useRouter()

  const user = useQuery(api.users.getMe);
  const hubs = useQuery(api.users.getMyHubs);
  const { signOut } = useClerk();


  const [currentHub, setCurrentHub] =
    useState<FunctionReturnType<typeof api.users.getMyHubs>[number]>();

  const tabs = useMemo(() => {
    const topTabs = [
      {
        name: "Home",
        href: "/",
        isActive: segments.length === 1,
        icon: <IconHome width={24} className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Discover",
        href: "/discover",
        isActive: segments[1] === "discover",
        icon: <IconCompass width={24} className="h-5 w-5" />,
        visible: subdomain === "app",
      },
      // {
      //   name: "Feed",
      //   href: "/feed",
      //   isActive: segments[0] === "feed",
      //   icon: <Newspaper width={24} className="h-5 w-5" />,
      //   visible: subdomain !== "app",
      // },

      {
        name: "Meetings",
        href: "/meetings",
        isActive: segments[1] === "meetings",
        icon: <IconCalendar width={24} className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Conversations",
        href: "/conversation",
        isActive: segments[1] === "conversation",
        icon: <IconMessages width={24} className="h-5 w-5" />,
        count: 1,
        visible: subdomain !== "admin",
      },

      {
        name: "Profile",
        href: "/profile",
        isActive: segments[1] === "profile",
        icon: <IconUser width={24} className="h-5 w-5" />,
        visible: subdomain !== "app" && subdomain !== "admin",
      },
      {
        name: "Admin panel",
        href: "/admin",
        isActive: segments[1] === "admin",
        icon: <IconUserCheck width={24} className="h-5 w-5" />,
        visible: true,
      }
      // {
      //   name: "Hub Settings",
      //   href: "/admin/settings",
      //   isActive: segments[2] === "settings",
      //   icon: <Settings width={24} className="h-5 w-5" />,
      //   visible:
      //     session.user.hubs[subdomain]?.role === HubRole.ADMIN ||
      //     (subdomain !== "app" &&
      //       subdomain !== "admin" &&
      //       session.user.role === UserRole.SUPERUSER),
      // },
    ];
    const botTabs = [
      {
        name: "Notifications",
        href: "/notifications",
        isActive: segments[1] === "notifications",
        icon: <IconBell width={24} className="h-5 w-5" />,
        count: 3,
        visible: subdomain !== "admin",
      },
      {
        name: "AI Assistant",
        href: "/assistant",
        isActive: segments[1] === "assistant",
        icon: <IconSparkles className="h-5 w-5" />,
        visible: true,
      },
      {
        name: "Help / Support",
        href: "/support",
        isActive: segments[1] === "support",
        icon: <IconHeartHandshake className="h-5 w-5" />,
        visible: true,
      },
    ];

    return { top: [...topTabs], bot: [...botTabs] };
  }, [segments, subdomain, user]);

  useEffect(() => {
    if (hubs) setCurrentHub(hubs.find((hub) => hub.subdomain === subdomain));
  }, [hubs]);

  useEffect(() => {
    if (currentHub && currentHub.brandingColor){
      const brandingColor = hexToHSL(currentHub.brandingColor); // Assuming hexToHSL function is defined elsewhere
  
    const generateShades = (hsl:string, steps:number) => {
      const [hue, saturation, lightness] = hsl.split(" ");
      const shades = [];

      for (let i = 1; i <= steps; i++) {
        const newLightness = Math.min(5 + i * 7, 90); // Increase lightness by 10% for each step
        shades.push(`${hue} ${saturation} ${newLightness}%`);
      }
      return shades;
    };

    const shades = generateShades(brandingColor, 5);

    // Set CSS variables for the primary color and its shades
    document.documentElement.style.setProperty("--primary", brandingColor);
    shades.forEach((shade, index) => {
      document.documentElement.style.setProperty(`--chart-${index + 1}`, shade);
    });
  }
  }, [currentHub]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-20 flex h-full flex-col md:w-[30vw] lg:w-[24vw]  xl:w-[18vw] p-4 bg-transparent `}
      >
        {hubs ? (
          <HubSwitcher
            currentHub={currentHub}
            hubs={hubs}
            className="w-full h-10 bg-card"
          />
        ) : (
          <Skeleton className="w-full h-10 bg-card " />
        )}

        <div className="flex h-full flex-col justify-between mt-8">
          <div className="flex flex-col gap-2">
            {subdomain !== "app" && <Search />}
            {tabs.top.map(({ name, href, isActive, icon, visible, count }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "items-center rounded-md py-2 px-4 gap-3  transition-all duration-150 ease-in-out text-foreground hover:bg-card",
                  isActive ? "bg-card text-card-foreground " : "bg-transparent",
                  visible ? "flex" : "hidden"
                )}
              >
                {icon}
                <span className="text-sm font-normal">{name}</span>
                {!!count && count > 0 && (
                  <span className=" text-xs font-normal bg-primary text-white border border-gray-500 rounded-full px-2  ">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {/* <Notifications /> */}
            {tabs.bot.map(({ name, href, isActive, icon, visible, count }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "items-center rounded-md py-2 px-4 gap-3  transition-all duration-150 ease-in-out text-foreground hover:bg-card",
                  isActive ? "bg-card text-card-foreground " : "bg-transparent",
                  visible ? "flex" : "hidden"
                )}
              >
                {icon}
                <span className="text-sm font-normal">{name}</span>
                {!!count && count > 0 && (
                  <span className=" text-xs font-normal bg-primary text-white rounded-full px-2 border border-gray-500  ">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        {/* profile */}
        <div className="w-full  flex items-center mt-4 h-12 justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} className="object-cover" />
              <AvatarFallback className="bg-white text-black">
                {user?.name
                  .split(" ")
                  .map((name) => name[0]?.toUpperCase() || "?")
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span className="truncate text-sm font-medium">{user?.name}</span>
              {user?.email && (
                <span className="font-small  text-[0.65rem]">
                  {truncate(user?.email, 20)}
                </span>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group p-2 outline-none hover:cursor-pointer ">
                <IconDots className="h-5 w-5 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-none shadow-xl text-foreground min-w-28"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>

                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => setTheme("light")}
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onClick={() => setTheme("system")}
                >
                  System
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => signOut({ returnTo: window.location.origin })}
                  className="flex gap-2 items-center"
                >
                  <IconLogout className="h-4 w-4 text-foreground" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
