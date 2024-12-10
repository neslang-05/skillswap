import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = verifyToken(token.value) as { userId: string }
    return NextResponse.json({ authenticated: true, userId: decoded.userId })
  } catch (_error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
} 