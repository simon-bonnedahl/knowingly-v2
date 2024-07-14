import type { Metadata } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { NavBar } from "@knowingly/navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@knowingly/footer";

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
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
