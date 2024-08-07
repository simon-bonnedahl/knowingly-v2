"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";


import { Icons } from "@knowingly/icons";
import { motion } from "framer-motion";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider  {...props}>{children}</NextThemeProvider>;
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();




  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <button
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        className="w-10 h-10 flex hover:bg-gray-50 dark:hover:bg-white/[0.1] rounded-lg items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none overflow-hidden"
      >
        {theme === "light" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <Icons.sun className="h-4 w-4 flex-shrink-0 text-foreground" />
          </motion.div>
        )}

        {theme === "dark" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              ease: "easeOut",
              duration: 0.3,
            }}
          >
            <Icons.moon className="h-4 w-4   flex-shrink-0  text-foreground" />
          </motion.div>
        )}

        <span className="sr-only">Toggle theme</span>
      </button>
    )
  );
}


export { ThemeProvider, ThemeToggle };
