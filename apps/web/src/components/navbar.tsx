"use client";

import type { FunctionReturnType } from "convex/server";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
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
import { Skeleton } from "@knowingly/ui/skeleton";
import { adjustLightness, generateShades, hexToHSL, truncate } from "@knowingly/utils";

import useWindowSize from "~/lib/hooks/useWindowSize";
import HubSwitcher from "./hub-switcher";
import { Notifications } from "./notifications";
import { Search } from "./search";
import { Support } from "./support";

export default function Navbar({ subdomain }: { subdomain: string }) {
  const segments = useSelectedLayoutSegments();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const user = useQuery(api.users.getMe);
  const hubs = useQuery(api.users.getHubs);
  const unreadMessages = useQuery(api.messages.getUnreadCount);
  const { signOut } = useClerk();

  const [currentHub, setCurrentHub] =
    useState<FunctionReturnType<typeof api.users.getHubs>[number]>();

  const isAdminVisible = useMemo(() => {
    if (subdomain === "app") return false;
    if (user?.role === "SUPERUSER") return true;
    if (currentHub?.role.permissions.canSeeAdminPanel) return true;
  }, [user, currentHub, subdomain]);

  const tabs = useMemo(() => {
    const topTabs = [
      {
        name: "Home",
        href: "/",
        id: "home",
        isActive: segments.length === 1,
        icon: <Icons.home className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Discover",
        href: "/discover",
        id:"discover",
        isActive: segments[1] === "discover",
        icon: <Icons.compass className="h-5 w-5" />,
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
        id: "meetings",
        isActive: segments[1] === "meetings",
        icon: <Icons.calendarEvent className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Conversations",
        href: "/conversations",
        id: "conversations",
        isActive: segments[1] === "conversations",
        icon: <Icons.messages className="h-5 w-5" />,
        count: unreadMessages,
        visible: subdomain !== "admin",
      },

      {
        name: "Profile",
        href: "/profile",
        id: "profile",
        isActive: segments[1] === "profile",
        icon: <Icons.userSquareRounded className="h-5 w-5" />,
        visible: subdomain !== "app" && subdomain !== "admin" && currentHub,
      },
      {
        name: "Admin",
        href: "/admin",
        id: "admin",
        isActive: segments[1] === "admin",
        icon: <Icons.userShield className="h-5 w-5" />,
        visible: isAdminVisible,
      },
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
        name: "AI Assistant",
        href: "#",
        id: "assistant",
        isActive: segments[1] === "assistant",
        icon: <Icons.sparkles className="h-5 w-5" />,
        visible: true,
      },
    ];

    return { top: [...topTabs], bot: [...botTabs] };
  }, [segments, subdomain, user]);

  useEffect(() => {
    if (hubs) setCurrentHub(hubs.find((hub) => hub.subdomain === subdomain));
  }, [hubs]);


  useEffect(() => {
    if (currentHub?.brandingColor && theme)
      setPrimaryColor(currentHub.brandingColor, theme);
  }, [currentHub]);

  const setPrimaryColor = (
    color: string | undefined,
    theme: string | undefined,
  ) => {
    if (!color || !document) return;
    const colorHSL = hexToHSL(color);
    const {adjustedColor, lightness} =
      theme === "dark" ? adjustLightness(colorHSL, 10) : adjustLightness(colorHSL, 0);
    // Set the primary color
    document.documentElement.style.setProperty("--primary", adjustedColor);
    // Determine lightness from adjustedColor and set primaryForeground
    const primaryForeground = lightness < 50 ? "0 0 100%" : "0 0 0%";
    document.documentElement.style.setProperty("--primary-foreground", primaryForeground);
    // Generate shades and set them
    const shades = generateShades(colorHSL, 5);
    if (theme === "dark") shades.reverse();
    shades.forEach((shade, index) => {
      document.documentElement.style.setProperty(`--chart-${index + 1}`, shade);
    });
  };

  if (isMobile) return null;

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-0 flex h-full flex-col bg-background p-4  md:w-[30vw] lg:w-[24vw] xl:w-[18vw] `}
      >
        {hubs  ? (
          <HubSwitcher
            currentHub={currentHub}
            hubs={hubs}
            className=" h-[3.25rem] w-full bg-card"
          />
        ) : (
          <Skeleton className="h-[3.25rem] w-full bg-card " />
        )}

        <div className="mt-2 flex h-full flex-col justify-between  pt-2">
          <div className="flex flex-col gap-2">
            {(subdomain !== "app" && currentHub) && <Search />}
            {tabs.top.map(({ name, href, isActive, icon, visible, count, id }) => (
              <Link
                id={id}
                key={name}
                href={href}
                className={cn(
                  "items-center gap-3 rounded-md px-4 py-2  text-foreground transition-all duration-150 ease-in-out hover:bg-card",
                  isActive ? "bg-card text-card-foreground " : "bg-transparent",
                  visible ? "flex" : "hidden",
                )}
              >
                {icon}
                <span className="text-sm font-normal">{name}</span>
                {!!count && count > 0 && (
                  <span className=" rounded-full border border-gray-500 bg-primary px-2 text-xs font-normal text-primary-foreground  ">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <Notifications />
            {tabs.bot.map(({ name, href, isActive, icon, visible }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "items-center gap-3 rounded-md px-4 py-2  text-foreground transition-all duration-150 ease-in-out hover:bg-card",
                  isActive ? "bg-card text-card-foreground " : "bg-transparent",
                  visible ? "flex" : "hidden",
                )}
              >
                {icon}
                <span className="text-sm font-normal">{name}</span>
              </Link>
            ))}
            <Support/>
          </div>
        </div>
        {/* profile */}
        <div className="mt-4  flex h-12 w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} className="object-cover" />
                <AvatarFallback className="bg-white text-black">
                  {user?.name
                    .split(" ")
                    .map((name) => name[0]?.toUpperCase() || "?")
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {user?.role === "SUPERUSER" && (
              <Icons.starFilled className="absolute bottom-0 -right-0.5 size-3 text-yellow-500" />
              )}
            </div>

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
                <Icons.dots className="h-5 w-5 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-28 border-none bg-card text-foreground shadow-xl"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>

                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => {
                    setTheme("light");
                    setPrimaryColor(currentHub?.brandingColor, "light");
                  }}
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => {
                    setTheme("dark");
                    setPrimaryColor(currentHub?.brandingColor, "dark");
                  }}
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
              <DropdownMenuItem
                onClick={() => router.push("/settings")}
                className="flex items-center gap-2"
              >
                <Icons.settings className="h-4 w-4 text-foreground" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className="flex items-center gap-2"
                >
                  <Icons.logout className="h-4 w-4 text-foreground" />
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
