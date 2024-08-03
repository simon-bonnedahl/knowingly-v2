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
      { hostname: "i.pravatar.cc" },
      { hostname: "images.unsplash.com" },
      { hostname: "files.edgestore.dev" },
      { hostname: "www.notion.so" },
    { hostname: "plus.unsplash.com" },
    { hostname: "confident-terrier-401.convex.cloud" },
    { hostname: "confident-terrier-401.convex.site" },
    { hostname: "neat-echidna-914.convex.cloud" },
    { hostname: "neat-echidna-914.convex.site" },
    { hostname: "img.clerk.com" },
    { hostname: "avatar.iran.liara.run" },
    ],
  },
};


export default config;
