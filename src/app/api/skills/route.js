import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const skillsPath = path.join(process.cwd(), 'src', 'config', 'skills.json');
  const skillsData = await fs.readFile(skillsPath, 'utf8');

  return NextResponse.json(JSON.parse(skillsData));
}