import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@knowingly/ui";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "~/context/theme-provider";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Knowingly",
  description:
    "Knowingly is a platform that provides...",
  openGraph: {
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlausibleProvider domain="simbo.casa">
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            GeistSans.className,
            "bg-white dark:bg-black antialiased h-full w-full"
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="light"
          >
            {children}
          </ThemeProvider>
          <TailwindIndicator />
        </body>
      </html>
    </ViewTransitions>
    </PlausibleProvider>
  );
}
