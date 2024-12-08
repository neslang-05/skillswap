import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { AppError, handleError } from '@/lib/errors';

// Get profile
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = verifyToken(token.value) as { userId: string };
    await connectDB();

    const user = await User.findById(decoded.userId)
      .select('name email avatar bio university year website twitter linkedin github skills interests location skillsOffered skillsWanted')
      .lean();

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return NextResponse.json(user);
  } catch (error) {
    return handleError(error);
  }
}

// Update profile
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = verifyToken(token.value) as { userId: string };
    const data = await request.json();
    
    await connectDB();
    
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        name: data.name,
        avatar: data.avatar,
        bio: data.bio,
        university: data.university,
        year: data.year,
        website: data.website,
        twitter: data.twitter,
        linkedin: data.linkedin,
        github: data.github,
        skills: data.skills,
        interests: data.interests,
        location: data.location,
        skillsOffered: data.skillsOffered,
        skillsWanted: data.skillsWanted
      },
      { new: true }
    ).select('name email avatar bio university year website twitter linkedin github skills interests location skillsOffered skillsWanted');

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return handleError(error);
  }
} 