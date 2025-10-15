import { NextResponse } from 'next/server';
import socialData from '../../../config/social.json';

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(socialData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}