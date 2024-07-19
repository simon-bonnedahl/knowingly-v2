"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

import { Button } from "@knowingly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider  {...props}>{children}</NextThemeProvider>;
};

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group p-2 outline-none dark:hover:bg-white"
        >
          <IconSun className="h-6 w-6 rotate-0 scale-100 text-white transition-all hover:text-black group-hover:text-black dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute h-6 w-6 rotate-90 scale-0   transition-all group-hover:text-black dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeProvider, ThemeToggle };
