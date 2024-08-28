import {withSentryConfig} from "@sentry/nextjs";
import  withNextBundleAnalyzer from '@next/bundle-analyzer'
import { withPlausibleProxy } from 'next-plausible'

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false, // could be good to have on to debug but it takes 2x bandwidth
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
    { hostname: "confident-terrier-401.convex.site" },
    { hostname: "neat-echidna-914.convex.cloud" },
    { hostname: "neat-echidna-914.convex.site" },
    { hostname: "img.clerk.com" },
    ],
  },
};


export default withPlausibleProxy()(config);

// export default withNextBundleAnalyzer()(config);

// export default  withSentryConfig(config, {
//   // Sentry configuration options
//   org: "student-lck",
//   project: "knowingly",
//   silent: !process.env.CI,
//   authToken: process.env.SENTRY_AUTH_TOKEN,
//   widenClientFileUpload: true,
//   hideSourceMaps: true,
//   disableLogger: true,
//   automaticVercelMonitors: true,
//   telemetry: false,
// });
