import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public routes - allow access without auth checks
  const publicRoutes = [
    '/',
    '/about',
    '/media',
    '/blog',
    '/contact',
    '/auth',
    '/api/auth',
  ]

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // Allow all public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, we'll handle auth checks in the page components
  // Middleware just allows them through - actual auth happens server-side in pages
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}