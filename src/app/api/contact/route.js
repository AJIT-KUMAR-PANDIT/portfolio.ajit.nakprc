import { NextResponse } from 'next/server';
import contactData from '../../../config/contact.json';

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(contactData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}