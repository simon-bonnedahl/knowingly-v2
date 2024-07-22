"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { useTheme } from "next-themes";

import { api } from "@knowingly/backend/convex/_generated/api";
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

import { env } from "~/env";
import useWindowSize from "~/lib/hooks/useWindowSize";
import { cn, hexToHSL, truncate } from "~/lib/utils";
import HubSwitcher from "./hub-switcher";
import { Icons } from "./icons";
import { Notifications } from "./notifications";
import { Search } from "./search";
import { Separator } from "@knowingly/ui/separator";

export default function Navbar({ subdomain }: { subdomain: string }) {
  const segments = useSelectedLayoutSegments();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const user = useQuery(api.users.getMe);
  const hubs = useQuery(api.users.getMyHubs);
  const unreadMessages = useQuery(api.messages.getUnreadCount) ;
  const { signOut } = useClerk();

  const [currentHub, setCurrentHub] =
    useState<FunctionReturnType<typeof api.users.getMyHubs>[number]>();

  const tabs = useMemo(() => {
    const topTabs = [
      {
        name: "Home",
        href: "/",
        isActive: segments.length === 1,
        icon: <Icons.home className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Discover",
        href: "/discover",
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
        isActive: segments[1] === "meetings",
        icon: <Icons.calendarEvent className="h-5 w-5" />,
        visible: subdomain !== "admin",
      },
      {
        name: "Conversations",
        href: "/conversations",
        isActive: segments[1] === "conversations",
        icon: <Icons.messages className="h-5 w-5" />,
        count: unreadMessages,
        visible: subdomain !== "admin",
      },

      {
        name: "Profile",
        href: "/profile",
        isActive: segments[1] === "profile",
        icon: <Icons.userSquareRounded className="h-5 w-5" />,
        visible: subdomain !== "app" && subdomain !== "admin",
      },
      {
        name: "Admin",
        href: "/admin",
        isActive: segments[1] === "admin",
        icon: <Icons.userShield className="h-5 w-5" />,
        visible: subdomain !== "app",
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
        href: "/assistant",
        isActive: segments[1] === "assistant",
        icon: <Icons.sparkles className="h-5 w-5" />,
        visible: true,
      },
      {
        name: "Help / Support",
        href: "/support",
        isActive: segments[1] === "support",
        icon: <Icons.heartHandshake className="h-5 w-5" />,
        visible: true,
      },
    ];

    return { top: [...topTabs], bot: [...botTabs] };
  }, [segments, subdomain, user]);

  useEffect(() => {
    if (hubs) setCurrentHub(hubs.find((hub) => hub.subdomain === subdomain));
  }, [hubs]);

  const adjustLightness = (hsl: string, amount: number) => {
    const [hue, saturation, lightness] = hsl.split(" ");
    let newLightness = parseInt(lightness as string) + amount;
    newLightness = Math.max(0, Math.min(100, newLightness)); // Clamp lightness value between 0 and 100
    return `${hue} ${saturation} ${newLightness}%`;
  };

  const generateShades = (hsl: string, steps: number) => {
    const [hue, saturation, lightness] = hsl.split(" ");
    const shades = [];

    for (let i = 1; i <= steps; i++) {
      const newLightness = Math.min(20 + i * 11, 75); // Increase lightness by 10% for each step
      shades.push(`${hue} ${saturation} ${newLightness}%`);
    }
    return shades;
  };

  useEffect(() => {
    if (currentHub && currentHub.brandingColor && theme)
      setPrimaryColor(currentHub.brandingColor, theme);

  }, [currentHub]);




  const setPrimaryColor = (color: string | undefined, theme: "dark" | "light") => {
    if (!color || !document) return;
    const colorHSL = hexToHSL(color);
    const adjustedColor = theme === "dark" ? adjustLightness(colorHSL, 30) : colorHSL;
    document.documentElement.style.setProperty('--primary', adjustedColor);
    const shades = generateShades(colorHSL, 5);
    if(theme === "dark") shades.reverse();
    shades.forEach((shade, index) => {
      document.documentElement.style.setProperty(
        `--chart-${index + 1}`,
        shade,
      );
    });

  }

  if (isMobile) return null;

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-20 flex h-full flex-col bg-background p-4  md:w-[30vw] lg:w-[24vw] xl:w-[18vw] `}
      >
        {hubs ? (
          <HubSwitcher
            currentHub={currentHub}
            hubs={hubs}
            className=" w-full bg-card h-12"
          />
        ) : (
          <Skeleton className="h-12 w-full bg-card " />
        )}

        <div className="mt-2 pt-2 flex h-full flex-col justify-between border-t">
          <div className="flex flex-col gap-2">
            {subdomain !== "app" && <Search />}
            {tabs.top.map(({ name, href, isActive, icon, visible, count }) => (
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
          </div>
        </div>
        {/* profile */}
        <div className="mt-4  flex h-12 w-full items-center justify-between">
          <div className="flex items-center gap-2">
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
                    setPrimaryColor(currentHub?.brandingColor, "light")}}
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => {
                    setTheme("dark");
                    setPrimaryColor(currentHub?.brandingColor, "dark")}}
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
                  onClick={() => signOut({ returnTo: window.location.origin })}
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
