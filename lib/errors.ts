import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.details : undefined
      },
      { status: error.statusCode }
    );
  }

  console.error('Unhandled error:', error);
  return NextResponse.json(
    {
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    },
    { status: 500 }
  );
} 