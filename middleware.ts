import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { JWTPayload } from './types/auth';

const protectedRoutes = ['/dashboard', '/profile'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      verify(token.value, process.env.JWT_SECRET!) as JWTPayload;
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}; 