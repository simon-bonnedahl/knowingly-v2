import { fileURLToPath } from "url";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@knowingly/backend",
    "@knowingly/ui",
    "@knowingly/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
    remotePatterns: [
      { hostname: "www.google.com" },
      { hostname: "media.licdn.com" },
      { hostname: "ofhdkjyiwnkwvjsgfxki.supabase.co" },
      { hostname: "plus.unsplash.com" },
      { hostname: "www.notion.so" },
      { hostname: "cdn.sanity.io" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "images.pexels.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "picsum.photos" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "files.edgestore.dev" },
    ],
  },
};

export default config;
