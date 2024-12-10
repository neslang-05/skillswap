import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { AppError, handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      throw new AppError('Missing required fields', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = signToken({ userId: user._id });

    const response = NextResponse.json(
      { 
        message: 'User created successfully',
        userId: user._id
      },
      { status: 201 }
    );
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800 // 7 days
    });

    return response;

  } catch (_error) {
    return handleError(_error);
  }
} 