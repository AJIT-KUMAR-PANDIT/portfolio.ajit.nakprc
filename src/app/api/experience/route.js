import { NextResponse } from 'next/server';
import experienceData from '../../../config/experience.json';

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(experienceData.experience), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}