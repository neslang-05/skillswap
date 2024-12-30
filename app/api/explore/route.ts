// app/api/explore/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('userId name avatar university skillsOffered skillsWanted').lean();
    return NextResponse.json({ users });
  } catch (_error) { // Prefix the error with an underscore to indicate it's unused
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
