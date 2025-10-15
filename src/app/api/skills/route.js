import { NextResponse } from 'next/server';
import skillsData from '../../../config/skills.json';
 
export const runtime = 'edge';
 
export async function GET() {
  return new Response(JSON.stringify(skillsData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}