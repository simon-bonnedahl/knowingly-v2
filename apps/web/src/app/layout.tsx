import type { Metadata, Viewport } from "next";
import "~/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { ThemeProvider } from "../components/theme";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { cn } from "~/lib/utils";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@knowingly/ui/toaster";

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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
          fontSans.variable
        )}
      >
        <ConvexClientProvider>
          <Toaster />
          <TailwindIndicator />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
