import { NextResponse } from 'next/server'
  import type { NextRequest } from 'next/server'

  export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Protect admin routes — redirect to auth if no session cookie
    if (pathname.startsWith('/admin')) {
      const session = request.cookies.get('sb-access-token') || request.cookies.get('supabase-auth-token')
      if (!session) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    }

    return NextResponse.next()
  }

  export const config = {
    matcher: ['/admin/:path*'],
  }
  