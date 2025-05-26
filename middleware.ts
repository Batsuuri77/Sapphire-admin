import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth"; // Adjust path if needed
import { parse } from "cookie";

export function middleware(req: NextRequest) {
  const cookie = req.headers.get("cookie");
  const cookies = parse(cookie || "");

  const token = cookies.auth_token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 👇 Define which routes to protect
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
