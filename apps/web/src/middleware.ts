import { NextResponse } from "next/server";


import { env } from "./env";
import { convexAuthNextjsMiddleware, isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";


// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-call


export default convexAuthNextjsMiddleware((request) => {

  const url = request.nextUrl;
  console.log("rq", request);
  const sharedPages = ["meetings", "conversations", "settings"];


  let hostname = request.headers
    .get("host")!
  const subdomain = hostname.split(".")[0];
  const domain = hostname.replace(`${subdomain}.`, "");

  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }
  console.log("hostname", hostname);
  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  const segments = path
    .split("/")
    .map((s) => s.split("?")[0])
    .filter((s) => s);

  if (sharedPages.includes(segments[0])) {
    // if (!auth.userId && !auth.isPublicRoute) {
    //   return redirectToSignIn({
    //     returnBackUrl: `${env.NEXT_PUBLIC_PROTOCOL}://${hostname}/`,
    //   });
    // }

    return NextResponse.rewrite(
      new URL(`/${hostname}/shared${path === "/" ? "" : path}`, request.url),
    );
  }
  console.log("isAuthenticatedNextjs", isAuthenticatedNextjs());

  if (hostname === `auth.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (isAuthenticatedNextjs()) {
      console.log("YES", isAuthenticatedNextjs());
      // if (request.nextUrl.searchParams.get("redirect"))
      //   return NextResponse.redirect(
      //     new URL(
      //       `${request.nextUrl.searchParams.get(
      //         "redirect",
      //       )}`,
      //       request.url,
      //     ),
      //   );
      // return NextResponse.redirect(
      //   new URL(`${env.NEXT_PUBLIC_PROTOCOL}://app.${domain}`),
      // );
    }
    console.log("path", path);

    return NextResponse.rewrite(
      new URL(`/auth${path === "/" ? "/sign-in" : path}`, request.url),
    );
  }

  // rewrites for app pages
  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // if (!isAuthenticatedNextjs()) {
    //   const prefix = env.NODE_ENV === "development" ? "http://" : "https://";
    //   return NextResponse.redirect(
    //     new URL(
    //       `http://auth.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in?redirect=${prefix}${hostname}/`,
    //       request.url,
    //     ),
    //   );
    // }

    return NextResponse.rewrite(
      new URL(`/${hostname}/app${path === "/" ? "" : path}`, request.url),
    );
  }
  if (hostname === `admin.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // if (!auth.userId && !auth.isPublicRoute) {
    //   const prefix = env.NODE_ENV === "development" ? "http://" : "https://";
    //   return redirectToSignIn({ returnBackUrl: `${prefix}${hostname}/` });
    // }

    return NextResponse.rewrite(
      new URL(`/admin${path === "/" ? "" : path}`, request.url),
    );
  }
  // if(!userId)
  //   return redirectToSignIn({ returnBackUrl: `${env.NEXT_PUBLIC_PROTOCOL}://${hostname}/` });

  if(!isAuthenticatedNextjs()) return NextResponse.rewrite(new URL(`/${hostname}/hub`, request.url));
  return NextResponse.rewrite(new URL(`/${hostname}/hub${path}`, request.url));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
