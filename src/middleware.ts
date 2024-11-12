import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const cookie = cookieStore.get('token')
  const cookie2 = req.cookies.get('token')

  console.log('Soy el cookie 1', cookie)
  console.log('Soy el cookie 2', cookie2)

  // Cambiamos la condición a `&&` para que pase si al menos una cookie existe
  // if (!cookie && !cookie2) {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*']
}
