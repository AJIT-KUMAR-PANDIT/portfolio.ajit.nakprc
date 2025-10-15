import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const resumeUrl = '/ajitkumarpandit.resume.pdf'; 
  return NextResponse.json({ url: resumeUrl });
}