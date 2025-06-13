import { NextResponse } from "next/server"
import { logger } from "./utils/logger"

/**
 * Middleware to add CORS headers and request logging
 */
export function middleware(request) {
  // Log the request
  const { pathname, search } = request.nextUrl
  logger.info(`[Middleware] Request: ${request.method} ${pathname}${search}`)

  // Get the response
  const response = NextResponse.next()

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Add cache control for API routes
  if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60")
  }

  return response
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: ["/api/:path*"],
}
