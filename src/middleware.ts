import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const cookie = cookieStore.get('token')
  // const pathname = req.nextUrl.pathname

  if (!cookie) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // if (cookie && pathname === '/') {
  //   return NextResponse.redirect(new URL('/dashboard', req.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*']
}
