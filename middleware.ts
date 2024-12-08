import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as jose from 'jose';

const protectedRoutes = ['/dashboard', '/profile', '/explore'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jose.jwtVerify(token.value, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      request.cookies.delete('token');
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/explore/:path*'],
};