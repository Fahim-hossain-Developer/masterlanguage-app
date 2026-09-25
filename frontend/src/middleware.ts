import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allow direct access to /dashboard during interactive UI review & development
const PROTECTED_PATHS: string[] = [];
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("accessToken")?.value ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  const isAuthenticated = Boolean(token);
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
