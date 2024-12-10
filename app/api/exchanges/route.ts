import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { AppError, handleError } from '@/lib/errors';

// Create new exchange
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = verifyToken(token.value) as { userId: string };
    await connectDB();

    const { partnerId, skillOffered, skillRequested } = await req.json();

    // Get partner's name
    const partner = await User.findById(partnerId).select('name');
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }

    // Add exchange to user's exchanges
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      {
        $push: {
          exchanges: {
            partnerId,
            partnerName: partner.name,
            skillOffered,
            skillRequested,
            status: 'pending'
          }
        }
      },
      { new: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return NextResponse.json({
      message: 'Exchange request created successfully',
      exchange: user.exchanges[user.exchanges.length - 1]
    });
  } catch (error) {
    return handleError(error);
  }
}

// Update exchange status
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = verifyToken(token.value) as { userId: string };
    await connectDB();

    const { exchangeId, status } = await req.json();

    const user = await User.findOneAndUpdate(
      {
        _id: decoded.userId,
        'exchanges._id': exchangeId
      },
      {
        $set: {
          'exchanges.$.status': status
        }
      },
      { new: true }
    );

    if (!user) {
      throw new AppError('Exchange not found', 404);
    }

    return NextResponse.json({
      message: 'Exchange status updated successfully'
    });
  } catch (error) {
    return handleError(error);
  }
} 