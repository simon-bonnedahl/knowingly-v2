"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { cn } from "@knowingly/ui";
import { Button, buttonVariants } from "@knowingly/ui/button";

import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme";
import { useTheme } from "next-themes";
import { Icons } from "@knowingly/icons";
import Link from "next/link";
import { env } from "~/env";

export const DesktopNavbar = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme();

  const [showBackground, setShowBackground] = useState(true);

  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        ease: [0.6, 0.05, 0.1, 0.9],
        duration: 0.8,
      }}
      className="fixed  inset-x-0 top-4  z-50 mx-auto w-[95%] max-w-7xl lg:w-full"
    >
      <div
        className={cn(
          "relative flex w-full justify-between rounded-full bg-transparent px-4 py-2 transition duration-200",
          showBackground &&
            "bg-card/85 shadow-[0px_-2px_0px_0px_var(--neutral-100),0px_2px_0px_0px_var(--neutral-100)] dark:shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]",
        )}
      >
        <AnimatePresence>
          {showBackground && (
            <motion.div
              key={String(showBackground)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
              }}
              className="pointer-events-none absolute inset-0 h-full w-full rounded-full bg-neutral-100 [mask-image:linear-gradient(to_bottom,white,transparent,white)] dark:bg-neutral-800"
            />
          )}
        </AnimatePresence>
        <div className="flex flex-row items-center gap-2">
          <Link href={env.NEXT_PUBLIC_PROTOCOL + "://" + env.NEXT_PUBLIC_ROOT_DOMAIN}>
          <Icons.logo className="h-6 w-6" />

          </Link>
          {/* <Logo size="full" theme={theme ?? "system"}/> */}
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href={env.NEXT_PUBLIC_PROTOCOL + "://auth." + env.NEXT_PUBLIC_ROOT_DOMAIN + "/sign-in?redirect=" + window.location.href} className={cn(buttonVariants({ variant: "ringHover", size: "sm"}), "rounded-full")} >Login</Link>
        </div>
      </div>
    </motion.nav>
  );
};
