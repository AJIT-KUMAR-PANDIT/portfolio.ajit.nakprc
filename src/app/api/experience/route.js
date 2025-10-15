import { NextResponse } from 'next/server';
import experienceData from '@/config/experience.json';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(experienceData.experience);
}