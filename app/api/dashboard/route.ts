import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { AppError, handleError } from '@/lib/errors';

// Define interfaces to match your Mongoose schema
interface IExchange {
  _id: string;
  skillOffered: string;
  skillRequested: string;
  status: string;
  partnerId: {
    name: string;
  };
}

interface IUser {
  name: string;
  email: string;
  skills: string[];
  exchanges: IExchange[];
}

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
      .select('name email skills exchanges')
      .populate('exchanges.partnerId', 'name')
      .lean<IUser>();

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Format exchanges data with type safety, handle case where exchanges might be undefined
    const formattedExchanges = user.exchanges?.map((exchange) => ({
      id: exchange._id,
      skillOffered: exchange.skillOffered,
      skillRequested: exchange.skillRequested,
      status: exchange.status,
      partnerName: exchange.partnerId?.name || 'Unknown User'
    })) || [];

    return NextResponse.json({
      name: user.name,
      email: user.email,
      skills: user.skills || [],
      exchanges: formattedExchanges
    });
  } catch (_error) {
    return handleError(_error);
  }
}