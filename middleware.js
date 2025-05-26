import { NextResponse } from "next/server"

// Disable middleware for now to ensure it's not interfering with redirection
export function middleware(request) {
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/api/:path*"],
}
