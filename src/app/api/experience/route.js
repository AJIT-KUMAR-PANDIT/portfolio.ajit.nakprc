import { NextResponse } from 'next/server';
import experienceData from '@/config/experience.json';

export async function GET() {
  return NextResponse.json(experienceData.experience);
}