import {withSentryConfig} from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@knowingly/backend",
    "@knowingly/ui",
    "@knowingly/validators",
    "geist"
  ],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { hostname: "www.google.com" },
      { hostname: "media.licdn.com" },
      { hostname: "image.unsplash.com" },
      { hostname: "ofhdkjyiwnkwvjsgfxki.supabase.co" },
      { hostname: "images.unsplash.com" },
      { hostname: "files.edgestore.dev" },
      { hostname: "www.notion.so" },
    { hostname: "plus.unsplash.com" },
    { hostname: "confident-terrier-401.convex.cloud" },
    ],
  },
};

export default  withSentryConfig(config, {
  // Sentry configuration options
  org: "student-lck",
  project: "knowingly",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
