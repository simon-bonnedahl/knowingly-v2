import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)",
  ], // Run middleware on API routes
};

export default clerkMiddleware((auth, req) => {
  auth().protect();
  const hostname = req.headers.get("host")!;
  const subdomain = hostname.split(".")[0];
  const domain = hostname.replace(`${subdomain}.`, "");

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${req.nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  switch (subdomain) {
    case "auth":
      // if (userId) {
      //   if (req.nextUrl.searchParams.get("redirect"))
      //     return NextResponse.redirect(
      //       new URL(
      //         `${env.NEXT_PUBLIC_PROTOCOL}://${req.nextUrl.searchParams.get(
      //           "redirect"
      //         )}`,
      //         req.url
      //       )
      //     );
      //   return NextResponse.redirect(
      //     new URL(`${env.NEXT_PUBLIC_PROTOCOL}://app.${domain}`)
      //   );
      // }
      return NextResponse.rewrite(
        new URL(`/auth${path === "/" ? "/signin" : path}`, req.url)
      );

    case "app":
      // if (!userId) {
      //   return NextResponse.redirect(
      //     new URL(`${env.NEXT_PUBLIC_PROTOCOL}://auth.${domain}`)
      //   );
      // }

      return NextResponse.rewrite(new URL(`/${hostname}/app${path}`, req.url));
    case "admin":
      return NextResponse.rewrite(new URL(`/admin${path}`, req.url));

    default:
      return NextResponse.rewrite(new URL(`/${hostname}/hub${path}`, req.url));
  }
});
