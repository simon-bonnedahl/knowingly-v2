import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { env } from "./env";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  // publicRoutes: ["/"],
  afterAuth: (auth, req) => {
    const url = req.nextUrl;


  const sharedPages = ["meetings", "conversations", "settings"] 

  let hostname = req.headers.get("host")!.replace(".knowingly.local:3000", `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  const subdomain = hostname.split(".")[0]
  const domain = hostname.replace(`${subdomain}.`, "");
 
    if (
      hostname.includes("---") &&
      hostname.endsWith(`.${env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split("---")[0]}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    }
    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    const segments = path
    .split("/")
    .map((s) => s.split("?")[0])
    .filter((s) => s);

  if (sharedPages.includes(segments[0])) {
    if (!auth.userId && !auth.isPublicRoute){
      return redirectToSignIn({ returnBackUrl: `${env.NEXT_PUBLIC_PROTOCOL}://${hostname}/` });
    }
    
    return NextResponse.rewrite(
      new URL(`/${hostname}/shared${path === "/" ? "" : path}`, req.url),
    );
  }
    
    if(hostname === `auth.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {

      if (auth.userId) {
        if (req.nextUrl.searchParams.get("redirect"))
          return NextResponse.redirect(
            new URL(
              `${env.NEXT_PUBLIC_PROTOCOL}://${req.nextUrl.searchParams.get(
                "redirect"
              )}`,
              req.url
            )
          );
        return NextResponse.redirect(
          new URL(`${env.NEXT_PUBLIC_PROTOCOL}://app.${domain}`)
        );
      }

      return NextResponse.rewrite(
      new URL(`/auth${path === "/" ? "/sign-in" : path}`, req.url)
      );
    }

    // rewrites for app pages
    if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!auth.userId && !auth.isPublicRoute) {
        const prefix =
          env.NODE_ENV === "development" ? "http://" : "https://";
        return redirectToSignIn({ returnBackUrl: `${prefix}${hostname}/` });
      } 


      return NextResponse.rewrite(
        new URL(`/${hostname}/app${path === "/" ? "" : path}`, req.url),
      );
    }
    if (hostname === `admin.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {


      return NextResponse.rewrite(
        new URL(`/admin${path === "/" ? "" : path}`, req.url),
      );
    }
    

    // rewrite everything else to `/[domain]/[slug] dynamic route
    if(!auth.userId)
      return redirectToSignIn({ returnBackUrl: `${env.NEXT_PUBLIC_PROTOCOL}://${hostname}/` });
    return NextResponse.rewrite(new URL(`/${hostname}/hub${path}`, req.url));
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
