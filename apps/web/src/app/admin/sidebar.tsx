"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
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
import { Sheet, SheetContent, SheetTrigger } from "@knowingly/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@knowingly/ui/tooltip";

import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme";
import useWindowSize from "~/lib/hooks/useWindowSize";
import { NavItem } from "./nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import { useQuery } from "convex/react";
import { useTheme } from "next-themes";
import { api } from "@knowingly/backend/convex/_generated/api";

export const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const user = useQuery(api.users.getMe);
  const { signOut } = useAuth();

  return (
    <>
    <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Icons.alignCenter className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Icons.home className="h-5 w-5" />
              Dashboard
            </Link>

            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Icons.users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Icons.chartLine className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link href={"https://app.simbo.casa"} className=" ml-1">
          <Icons.logo className="h-6 w-6" />
        </Link>

        <NavItem href="/" label="Dashboard">
          <Icons.home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/hubs" label="Hubs">
          <Icons.buildingCommunity className="h-5 w-5" />
        </NavItem>

        <NavItem href="/users" label="Users">
          <Icons.users className="h-5 w-5" />
        </NavItem>

        <NavItem href="/analytics" label="Analytics">
          <Icons.chartLine className="h-5 w-5" />
        </NavItem>
        <NavItem href="/blog" label="Blog">
          <Icons.notebook className="h-5 w-5" />
        </NavItem>
        <NavItem href="/flags" label="Flags">
          <Icons.flag className="h-5 w-5" />
        </NavItem>
        <NavItem href="/support" label="Support">
          <Icons.heartHandshake className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group p-2 outline-none hover:cursor-pointer ">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} className="object-cover" />
              <AvatarFallback className="bg-white text-black">
                {user?.name
                  .split(" ")
                  .map((name) => name[0]?.toUpperCase() || "?")
                  .join("")}
              </AvatarFallback>
            </Avatar>
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
                }}
              >
                Light
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "dark"}
                onClick={() => {
                  setTheme("dark");
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
      </nav>
    </aside>
    </>

  );
};
