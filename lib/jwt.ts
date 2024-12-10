import * as jose from 'jose';
import jwt from 'jsonwebtoken';

// For server-side operations (API routes)
export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

// For edge runtime (middleware)
export async function verifyTokenEdge(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await jose.jwtVerify(token, secret);
} 