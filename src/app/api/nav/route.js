import { NextResponse } from 'next/server';
import navData from '../../../config/nav.json';

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(navData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}