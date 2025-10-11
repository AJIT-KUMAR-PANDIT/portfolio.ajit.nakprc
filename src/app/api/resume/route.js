import { NextResponse } from 'next/server';

export async function GET() {
  const resumeUrl = '/ajitkumarpandit.resume.pdf'; 
  return NextResponse.json({ url: resumeUrl });
}