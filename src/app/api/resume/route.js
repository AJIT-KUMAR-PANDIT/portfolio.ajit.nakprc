import { NextResponse } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET() {
  return new Response(JSON.stringify({ url: '/ajitkumarpandit.resume.pdf' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}