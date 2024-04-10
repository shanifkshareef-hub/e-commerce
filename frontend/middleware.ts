import { NextRequest, NextResponse } from "next/server";
import { clearCookies, isAuthenticated } from "./utils/helpers";
import { KJUR } from "jsrsasign";

// Add whatever paths you want to PROTECT here
// const authRoutes = ["/app/*", "/account/*", "/api/*", "/admin/*"];
const publicRoutes = ["/login", "/register"];

// Function to match the * wildcard character
function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }
  return path === pattern;
}

export async function middleware(request: NextRequest) {
  // Shortcut for our login path redirect
  // Note: you must use absolute URLs for middleware redirects

  const { pathname } = request.nextUrl;

  const LOGIN = new URL("/login", request.url);

  if (request.nextUrl.pathname.startsWith("/_next")) {
    console.log("next");

    return NextResponse.next();
  }

  const publicRoutes = ["/login"];

  const isPublic = publicRoutes.some((route) => route === pathname);

  const verifyToken = () => {
    let token = request.cookies.get("token");
    let public_key = request.cookies.get("pk");

    if (!token || !public_key) {
      NextResponse.redirect(new URL("/login", request.url));
      return false;
    }
    if (
      !KJUR.jws.JWS.verifyJWT(token.value, public_key.value, {
        alg: ["RS256"],
      })
    ) {
      return false;
    }
    return true;
  };
  let isValid = verifyToken();

  if (pathname === "/login") {
    console.log("isValid", isValid);
    if (isValid) {
      NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isPublic) {
    return NextResponse.next();
  } else {
    if (isValid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(LOGIN);
    }
  }
}
