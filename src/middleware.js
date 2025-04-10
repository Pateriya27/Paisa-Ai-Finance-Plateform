import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the paths for sign-in, sign-up, and after-sign-in pages
const publicPaths = ["/", "/sign-in*", "/sign-up*", "/.well-known/*"];
const isPublic = (path) => {
  return publicPaths.find(x => 
    path.match(new RegExp(`^${x.replace('*', '.*')}$`))
  );
};

export default function middleware(request) {
  const { nextUrl } = request;
  const isPublicPath = isPublic(nextUrl.pathname);

  // Explicitly set redirects for auth paths
  const clerkMiddlewareWithConfig = clerkMiddleware({
    afterSignInUrl: '/dashboard',
    afterSignUpUrl: '/dashboard'
  });

  return clerkMiddlewareWithConfig(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
