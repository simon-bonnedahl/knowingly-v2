import type { Metadata, Viewport } from "next";
import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "../components/theme";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { cn } from "@knowingly/ui";
import { Toaster } from "@knowingly/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AlertDialogProvider } from "./AlertDialogProvider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "Knowingly",
  description:
    " Knowingly is a platform for connecting you with the right person to help you solve your problem.",
  metadataBase: new URL("https://knowingly.dev"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.className
        )}
      >
        <ConvexClientProvider>
          <TailwindIndicator />
          <AlertDialogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Toaster richColors />

            {children}
          </ThemeProvider>
          </AlertDialogProvider>
        </ConvexClientProvider>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
