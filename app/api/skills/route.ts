import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token but we don't need userId for this endpoint
    verifyToken(token.value)

    // Return mock skills data for now
    return NextResponse.json({
      skills: [
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'TypeScript',
        'HTML/CSS',
        'Java',
        'C++',
        'Data Science',
        'Machine Learning'
      ]
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token but we don't need userId for this endpoint
    verifyToken(token.value)
    const body = await request.json()

    // Validate and process the new skill
    if (!body.skill || typeof body.skill !== 'string') {
      return NextResponse.json({ error: 'Invalid skill data' }, { status: 400 })
    }

    // Here you would typically save the skill to your database
    return NextResponse.json({ message: 'Skill added successfully' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 