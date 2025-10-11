import { NextResponse } from 'next/server';
import aboutData from '@/config/about.json';

export async function GET() {
  return NextResponse.json(aboutData.aboutMe);
}